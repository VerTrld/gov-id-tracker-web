import {
    Combobox,
    ComboboxDropdownProps,
    ComboboxProps,
    InputBase,
    InputBaseProps,
    useCombobox,
} from '@mantine/core';
import _ from 'lodash';
import { useEffect, useState } from 'react';

interface ISelectCreateable extends InputBaseProps {
    data: string[];
    onChangeOptionSelect?: (value: string) => void;
    inputValue?: string | null;
    dropDownProps?: ComboboxDropdownProps;
    comboBoxProps?: ComboboxProps;
}

export function SelectCreatable({
    data,
    onChangeOptionSelect,
    inputValue,
    dropDownProps,
    comboBoxProps,
    ...res
}: ISelectCreateable) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const [dataOptions, setDataOptions] = useState(data);
    const [value, setValue] = useState<string | null>(null);
    const [search, setSearch] = useState(inputValue ?? '');

    const exactOptionMatch = dataOptions.some((item) => item === search);
    const filteredOptions = exactOptionMatch
        ? dataOptions
        : dataOptions.filter((item) =>
            item.toLowerCase().includes(search.toLowerCase().trim())
        );

    const options = filteredOptions.map((item, index) => (
        <Combobox.Option value={item} key={`${item}-${index}`}>
            {item}
        </Combobox.Option>
    ));

    useEffect(() => {
        setDataOptions(data);
    }, [data]);

    return (
        <Combobox
            store={combobox}
            onOptionSubmit={(val) => {
                onChangeOptionSelect?.(val);
                if (val === search) {
                    setDataOptions((current) => [...current, search]);
                    setValue(search);
                } else {
                    setValue(val);
                    setSearch(val);
                }
                combobox.closeDropdown();
            }}
            {...comboBoxProps}
        >
            <Combobox.Target>
                <InputBase
                    readOnly={comboBoxProps?.disabled}
                    autoFocus={false}
                    size="xs"
                    rightSection={<Combobox.Chevron />}
                    value={search}
                    onChange={(event) => {
                        combobox.updateSelectedOptionIndex();
                        if (_.isEmpty(event.currentTarget.value)) {
                            setSearch('');
                        } else {
                            setSearch(event.currentTarget.value);
                        }
                    }}
                    onClick={() => {
                        combobox.openDropdown();
                    }}
                    onBlur={() => {
                        combobox.closeDropdown();
                        setSearch(value || '');
                    }}
                    rightSectionPointerEvents="none"
                    {...res}
                />
            </Combobox.Target>
            <Combobox.Dropdown {...dropDownProps}>
                <Combobox.Options>
                    {options}
                    {!exactOptionMatch && search.trim().length > 0 && (
                        <Combobox.Option value={`${search}`} key={`${search}-create`}>
                            + Create {search}
                        </Combobox.Option>
                    )}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
