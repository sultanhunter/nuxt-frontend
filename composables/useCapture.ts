import axios from "axios";

interface CopChoice {
    copIndex: string;
    cityId: string | null;
    vehicleId: string | null;
}


interface City {
    id: string;
    name: string;
    distance: number
}

interface Vehicle {
    id: string;
    kind: string;
    range: number;
    count: number;
}

interface CityVehicleData {
    cities: City[];
    vehicles: Vehicle[]
}

interface Result {
    success: boolean;
    copIndex?: string
}


export default () => {

    const initialState = [
        {copIndex: '0', vehicleId: null, cityId: null}, {copIndex: '1', vehicleId: null, cityId: null}, {
            copIndex: '2',
            vehicleId: null,
            cityId: null
        }
    ];
    const selectionState = () => useState<CopChoice[]>('selectionState', () => initialState)

    const cityVehicleData = () => useState<CityVehicleData>('cityVehicleData', () => ({
        cities: [], vehicles: []
    }))

    const result = () => useState<Result | null>('result', () => null)

    const isFetchingData = useState('isLoading', () => true)

    const isSubmittingData = useState('isSubmitting', () => false)

    const fetchCityVehicleData = async () => {
        isFetchingData.value = true;
        const url = 'https://nuxt-backend-vez7.onrender.com/capture'
        try {

            let timerCompleted = false;
            setTimeout(() => {
                if (cityVehicleData().value) {
                    isFetchingData.value = false
                }
                timerCompleted = true
            }, 1500)

            const {data} = await axios.get(url, {
                headers: {
                    "Content-Type": 'application/json',
                    "User-Agent": 'PostmanRuntime/7.36.3'
                }
            })

            console.log(data)

            const cityVehicleDataFromApi: CityVehicleData = data;

            const ourData = cityVehicleData()
            ourData.value = cityVehicleDataFromApi
            if (timerCompleted) {
                isFetchingData.value = false
            }


        } catch (e) {
            isFetchingData.value = false
        }
    }

    const startHunting = async () => {
        const allOptionsFilled = selectionState().value.every((choice) => choice.cityId && choice.vehicleId)
        if (!allOptionsFilled) {
            alert('Select all options')
            return
        }
        const url = 'https://nuxt-backend-vez7.onrender.com/capture'

        const body = {
            'copChoices': selectionState().value.map((choice) => ({
                'cop': choice.copIndex,
                'cityId': choice.cityId,
                'vehicleId': choice.vehicleId
            }))
        }

        try {
            isSubmittingData.value = true

            let timerCompleted = false;

            setTimeout(() => {
                if (result().value) {
                    isSubmittingData.value = false
                }
                timerCompleted = true
            }, 1500)

            const {data} = await axios.post(url, body)
            result().value = data;
            if (timerCompleted) {
                isSubmittingData.value = false
            }
        } catch (e) {
            isSubmittingData.value = false
        }

    }


    const updateSelectedCityForCop = (copIndex: string, cityId: string) => {
        const state = selectionState()
        const choice = state.value.find((choice) => choice.copIndex === copIndex);
        if (choice) {
            if (cityId.length > 1) {
                choice.cityId = cityId;
                choice.vehicleId = null
            } else {
                choice.cityId = null
                choice.vehicleId = null
            }
        }
    }

    const updateSelectedVehicleForCop = (copIndex: string, vehicleId: string) => {
        const state = selectionState()
        const choice = state.value.find((choice) => choice.copIndex === copIndex);
        if (choice) {
            if (vehicleId.length > 1) {
                choice.vehicleId = vehicleId;
            } else {
                choice.vehicleId = null
            }
        }
    }


    const getSelectedChoiceForCop = (copIndex: string) => {
        const state = selectionState()
        return state.value.find((choice) => choice.copIndex === copIndex)
    }

    const cityAvailableForCop = (copIndex: string, cityId: string) => {
        const selections = selectionState()

        const choice = selections.value.find((choice) => choice.cityId === cityId)

        if (choice?.copIndex === copIndex) {
            return true
        }

        return !choice;
    }

    const vehicleAvailableForCop = (copIndex: string, vehicleId: string) => {
        const selection = selectionState()

        const choice = selection.value.find((choice) => choice.vehicleId === vehicleId)


        if (choice?.copIndex === copIndex) {
            return true
        }

        const data = cityVehicleData();

        const totalCount = data.value.vehicles.find((vehicle) => vehicle.id === vehicleId)?.count

        if (!totalCount) {
            return false

        }

        const usedCount = selection.value.filter((choice) => choice.vehicleId === vehicleId).length;

        return totalCount - usedCount >= 1
    }

    const vehicleAvailableForCity = (cityId: string, vehicleId: string) => {

        const data = cityVehicleData()

        const city = data.value.cities.find((city) => city.id === cityId)
        const vehicle = data.value.vehicles.find((vehicle) => vehicle.id === vehicleId)

        if (!city || !vehicle) {
            return false
        }

        return vehicle.range >= city.distance * 2

    }

    const cityAlreadySelectedForCop = (copIndex: string, cityId: string) => {
        return selectionState().value.find((choice) => choice.copIndex === copIndex)?.cityId === cityId
    }

    const vehicleAlreadySelectedForCop = (copIndex: string, vehicleId: string) => {
        return selectionState().value.find((choice) => choice.copIndex === copIndex)?.vehicleId === vehicleId

    }


    return {
        isFetchingData,
        isSubmittingData,
        result,
        fetchCityVehicleData,
        updateSelectedCityForCop,
        updateSelectedVehicleForCop,
        getSelectedChoiceForCop,
        cityVehicleData,
        cityAvailableForCop,
        vehicleAvailableForCop,
        cityAlreadySelectedForCop,
        vehicleAlreadySelectedForCop,
        vehicleAvailableForCity,
        startHunting,
    }
}