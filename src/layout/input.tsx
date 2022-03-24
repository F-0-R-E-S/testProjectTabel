import { TextInput, Checkbox, ColorPicker } from '@mantine/core';
import React from 'react'

type Props = {
    register: any
    name: any
    errors: any
    onChange?: Function
    required: boolean
    label?: string
    description?: string
    loading?: boolean
    onBlur?: Function
    type?: string
    placeholder?: string
    onClick?: Function
}

export function ColorForm({ register, name, errors, required, loading, ...rest }: Props) {
    return (
        <ColorPicker
            format="hex"
            value="#C5D899"
            size="xs"
            {...register(name, { required: required })}
            {...rest}
            error={name in errors && "This field is mandatory, fill it in"}
            required={required}
            disabled={loading}
        />
    );
}

export function InputForm({ register, name, errors, required, loading, ...rest }: Props) {
    return (
        <TextInput
            {...register(name, { required: required })}
            {...rest}
            error={name in errors && "This field is mandatory, fill it in"}
            required={required}
            disabled={loading}
        />
    );
}

export function CheckboxForm({ register, name, errors, required, loading, ...rest }: Props) {
    return (
        <Checkbox
            {...register(name, { required: required })}
            {...rest}
            error={name in errors && "This field is mandatory, fill it in"}
            required={required}
            disabled={loading}
        />
    );
}
