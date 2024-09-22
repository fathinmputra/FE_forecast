import { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';

import { useGetAllLocations } from '@/app/api/hooks/inventory/inventory/useGetAllInventories';
import { SelectOptionProperty } from '@/helpers/utils/component/select';
import {
  inventoryLocationInitialState,
  InventoryLocationProperty,
} from '@/helpers/utils/inventory/inventory_location';

interface ISelectLocation {
  location: SingleValue<InventoryLocationProperty>;
  handleChangeLocation: (location_pkid: number) => void;
}

const SelectLocation = ({ handleChangeLocation }: ISelectLocation) => {
  const { data: listLocations } = useGetAllLocations();
  const [allLocation, setAllLocation] = useState([] as SelectOptionProperty[]);

  useEffect(() => {
    if (listLocations) {
      const tempAllLocation = [
        {
          value: inventoryLocationInitialState.pkid.toString(),
          label: inventoryLocationInitialState.name,
        },
      ];
      listLocations.forEach((location: InventoryLocationProperty) => {
        tempAllLocation.push({
          value: location.pkid.toString(),
          label: location.name,
        });
      });
      setAllLocation(tempAllLocation);
    }
  }, [listLocations]);

  return (
    <Select
      className='w-[250px]'
      options={allLocation}
      defaultValue={allLocation[0] as SingleValue<SelectOptionProperty>}
      onChange={(selectedLocation: SingleValue<SelectOptionProperty>) =>
        handleChangeLocation(parseInt(selectedLocation?.value || '0'))
      }
    />
  );
};

export default SelectLocation;
