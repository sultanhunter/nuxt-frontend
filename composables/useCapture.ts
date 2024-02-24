import axios from "axios";

interface CopChoice {
    copIndex: string;
    cityId?: string;
    vehicleId?: string;
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


export default () => {

    const initialState = [
        {copIndex: '0'}, {copIndex: '1'}, {copIndex: '2'}
    ];
    const selectionState = () => useState<CopChoice[]>('selectionState', () => initialState)

    const cityVehicleData = () => useState<CityVehicleData>('cityVehicleData', () => ({
        cities: [], vehicles: []
    }))

    const isLoading = useState('isLoading', () => false)

    const fetchCityVehicleData = async () => {
        isLoading.value = true;
        const url = 'http://localhost:8000/capture'
        try {
            const {data} = await axios.get(url)

            const cityVehicleDataFromApi: CityVehicleData = data;

            const ourData = cityVehicleData()
            ourData.value = cityVehicleDataFromApi
            isLoading.value = false
            console.log(ourData.value)

        } catch (e) {
            isLoading.value = false
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
        const choice = state.value.find((choice) => choice.copIndex === copIndex);
        if (choice) {
            choice.vehicleId = vehicleId;
        }
    }


    const getSelectedChoice = (copIndex: string) => {
        const state = selectionState()
        return state.value.find((choice) => choice.copIndex === copIndex)
    }

    const cityAvailable = (cityId: string) => {
        const state = selectionState()
        const choice = state.value.find((choice) => choice.cityId === cityId)
        return !choice;
    }

    const vehicleAvailable = (cityId: string, vehicleId: string) => {
        const selection = selectionState()
        const data = cityVehicleData();
        const cityDistance = data.value.cities.find((city) => city.id === cityId)?.distance;
        const vehicleRange = data.value.vehicles.find((vehicle) => vehicle.id === vehicleId)?.range

        if (!cityDistance || !vehicleRange) {
            return false
        }

        const vehicleRangeValid = vehicleRange >= (cityDistance! * 2);
        
        const totalCount = data.value.vehicles.find((vehicle) => vehicle.id === vehicleId)?.count

        if (!totalCount) {
            return false

        }

        const usedCount = selection.value.filter((choice) => choice.vehicleId === vehicleId).length;

        return vehicleRangeValid && (totalCount - usedCount >= 1)
    }


    return {
        isLoading,
        fetchCityVehicleData,
        updateSelectedCity,
        updateSelectedVehicle,
        getSelectedChoice,
        cityVehicleData,
        cityAvailable,
        vehicleAvailable,
    }
}