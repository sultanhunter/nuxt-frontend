interface SelectedModalOption {
    copIndex: string;
    type: string;
}


export default () => {
    const openState = () => useState('is-open', () => false)


    const selectedOption = () => useState<SelectedModalOption>('selected-option', () => ({
        copIndex: '',
        type: '',
    }));
    const setIsOpen = (value: boolean) => {
        openState().value = value
    }

    const setSelectedOption = (options: SelectedModalOption) => {
        selectedOption().value = options
    }

    return {
        openState,
        setIsOpen,
        selectedOption,
        setSelectedOption,
    }
}