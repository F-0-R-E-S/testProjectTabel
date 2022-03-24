import styled from 'styled-components'

type Props = {
    children: any;
    title: string;
    name: string;
    register: Function;
    required: boolean;
    loading: boolean;
    errors: any;
}
export const SelectForm = ({ children, title, errors, register, name, required, loading, ...rest }: Props) => {

    return (
        <ContainerSelect>
            <LableSelect>{title}</LableSelect>
            <Select
                {...register(name, { required: required })}
                {...rest}>
                {children}
            </Select>

        </ContainerSelect>
    );
}


const ContainerSelect = styled.div`
    margin-bottom: 20px;
`
const Select = styled.select`
    height: 36px;
    border: 1px solid #ced4da;
    background-color: #fff;
    font-size: 14px;
    width: 100%;
    color: #000;
    display: block;
    text-align: left;
    min-height: 36px;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 4px;
`
const LableSelect = styled.label`
    display: inline-block;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #212529;
    word-break: break-word;
    cursor: default;
    -webkit-tap-highlight-color: transparent;
`

