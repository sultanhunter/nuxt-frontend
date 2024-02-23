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

    const cityVehicleData = () => useState<CityVehicleData>('cityVehicleData')

    const isLoading = useState('isLoading', () => false)

    const getCityVehicleData = async () => {
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
        console.log('updating city')
        const state = selectionState()
        const choice = computed(() => {
            return state.value.find((choice) => choice.copIndex === copIndex);
        });
        if (choice.value) {
            choice.value.cityId = cityId;
        }
    }

    const updateSelectedVehicle = (copIndex: string, vehicleId: string) => {
        console.log('updating city')
        const state = selectionState()
        const choice = computed(() => {
            return state.value.find((choice) => choice.copIndex === copIndex);
        });
        if (choice.value) {
            choice.value.vehicleId = vehicleId;
        }
    }


    const getSelectedChoice = (copIndex: string) => {
        const state = selectionState()
        return computed(() => {
            return state.value.find((choice) => choice.copIndex === copIndex);
        });
    }


    return {
        isLoading,
        getCityVehicleData,
        updateSelectedCity,
        updateSelectedVehicle,
        getSelectedChoice,
    }
}