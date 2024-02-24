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

    const updateSelectedCityForCop = (copIndex: string, cityId: string) => {
        const state = selectionState()
        const choice = state.value.find((choice) => choice.copIndex === copIndex);
        if (choice) {
            if (cityId.length > 1) {
                choice.cityId = cityId;
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

        const vehiclesSelectedCount: Record<string, number> = {};
        selections.value.forEach((choice) => {
            if (choice.vehicleId) {
                vehiclesSelectedCount[choice.vehicleId] = (vehiclesSelectedCount[choice.vehicleId] || 0) + 1
            }
        })


        const availableVehiclesForThisCity = cityVehicleData().value.vehicles.filter((vehicle) => {
            const id = vehicle.id
            const range = vehicle.range
            const totalCount = vehicle.count

            const cityDistance = cityVehicleData().value.cities.find((city) => {
                return city.id === cityId
            })?.distance


            const rangeValid = range >= (cityDistance ?? 0) * 2;

            const selectedCount = vehiclesSelectedCount[id] ?? 0

            const countValid = vehicleAlreadySelectedForCop(copIndex, id) ? true : (totalCount - selectedCount >= 1)

            return rangeValid && countValid;

        })


        return !choice && (availableVehiclesForThisCity.length >= 1);
    }

    const vehicleAvailableForCop = (copIndex: string, cityId: string, vehicleId: string) => {
        const selection = selectionState()

        const choice = selection.value.find((choice) => choice.vehicleId === vehicleId)


        if (choice?.copIndex === copIndex) {
            return true
        }

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

    const cityAlreadySelectedForCop = (copIndex: string, cityId: string) => {
        return selectionState().value.find((choice) => choice.copIndex === copIndex)?.cityId === cityId
    }

    const vehicleAlreadySelectedForCop = (copIndex: string, vehicleId: string) => {
        return selectionState().value.find((choice) => choice.copIndex === copIndex)?.vehicleId === vehicleId

    }


    return {
        isLoading,
        fetchCityVehicleData,
        updateSelectedCityForCop,
        updateSelectedVehicleForCop,
        getSelectedChoiceForCop,
        cityVehicleData,
        cityAvailableForCop,
        vehicleAvailableForCop,
        cityAlreadySelectedForCop,
        vehicleAlreadySelectedForCop,
    }
}