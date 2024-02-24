interface SelectedModalOption {
    copIndex: string;
    type: string;
}


export default () => {
    const openState = () => useState('is-open', () => false)


    const modalSelectedOption = () => useState<SelectedModalOption>('selected-option', () => ({
        copIndex: '',
        type: '',
    }));
    const setIsOpen = (value: boolean) => {
        openState().value = value
    }

    const setSelectedOption = (options: SelectedModalOption) => {
        modalSelectedOption().value = options
    }

    return {
        openState,
        setIsOpen,
        modalSelectedOption,
        setSelectedOption,
    }
}