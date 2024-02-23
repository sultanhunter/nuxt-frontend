import axios from "axios";

interface CopChoice {
    copIndex: string;
    cityId?: string;
    vehicleId?: string;
}


export default () => {

    const initialState = [
        {copIndex: '0'}, {copIndex: '1'}, {copIndex: '2'}
    ];
    const selectionState = () => useState<CopChoice[]>('selectionState', () => initialState)

    const getData = async () => {

        const url = 'http://localhost:8000/capture'
        try {
            const {data} = await axios.get(url)
        } catch (e) {
        }
    }

    const updateSelectedCity = (copIndex: string, cityId: string) => {
        const state = selectionState()
        const choice = state.value.find((choice) => choice.copIndex === copIndex);
        if (choice) {
            choice.cityId = cityId;
        }
    }

    const updateSelectedVehicle = (copIndex: string, vehicleId: string) => {
        const state = selectionState()
        const choice = state.value.find((choice) => choice.copIndex === copIndex)
        if (choice) {
            choice.vehicleId = vehicleId
        }
    }

    const getSelectedCityId = (copIndex: string) => {
        const state = selectionState()
        const choice = state.value.find((choice) => choice.copIndex === copIndex);
        return choice?.cityId
    }

    const getSelectedVehicleId = (copIndex: string) => {
        const state = selectionState()
        const choice = state.value.find((choice) => choice.copIndex === copIndex);
        return choice?.vehicleId
    }


    return {
        updateSelectedCity,
        updateSelectedVehicle,
        getSelectedCityId,
        getSelectedVehicleId,
    }
}