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

    const cityAvailable = (cityId: string) => {
        const state = selectionState()
        return computed(() => {
            const choice = state.value.find((choice) => choice.cityId === cityId)
            return !choice;
        })
    }

    const vehicleAvailable = (cityId: string, vehicleId: string) => {
        const selection = selectionState()
        const data = cityVehicleData();
        const cityDistance = computed(() => {
            return data.value.cities.find((city) => city.id === cityId)?.distance;
        })
        const vehicleRange = computed(() => {
            return data.value.vehicles.find((vehicle) => vehicle.id === vehicleId)?.range
        })

        if (!cityDistance.value || !vehicleRange.value) {
            return computed(() => false)
        }

        const vehicleRangeValid = computed(() => {
            return vehicleRange.value! >= (cityDistance.value! * 2)
        })

        const totalCount = computed(() => {
            return data.value.vehicles.find((vehicle) => vehicle.id === vehicleId)?.count
        })

        if (!totalCount.value) {
            return computed(() => false)

        }

        const usedCount = computed(() => {
            return selection.value.filter((choice) => choice.vehicleId === vehicleId).length
        })
        
        return computed(() => {
            return vehicleRangeValid.value && (totalCount.value! - usedCount.value >= 1)
        })
    }


    return {
        isLoading,
        getCityVehicleData,
        updateSelectedCity,
        updateSelectedVehicle,
        getSelectedChoice,
        cityVehicleData,
        cityAvailable,
        vehicleAvailable,
    }
}