import { useEffect, useState } from 'react'
import type { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import type { ItemType, ListModeType } from 'react-native-dropdown-picker'
import DropDownPicker from 'react-native-dropdown-picker'

type Props = {
  field: ControllerRenderProps<FieldValues, string>,
  placeholder: string,
  items: ItemType<string>[]
  listMode?: ListModeType
}

export function GdocDropdown({field, placeholder, items, listMode = "SCROLLVIEW"}: Props) {
  const [open, setOpen] = useState(false)
  const [itemsState, setItemsState] = useState<ItemType<string>[]>(items)

  useEffect(() => {
    setItemsState(items)
  }, [items])

  return (
    <DropDownPicker
      placeholder={placeholder}
      setItems={setItemsState}
      dropDownDirection="BOTTOM"
      items={itemsState}
      open={open}
      setOpen={setOpen}
      dropDownContainerStyle={styles.dropdownOpen}
      listMode={listMode}
      value={field.value}
      setValue={(callback) => {
        const newValue = callback(field.value)
        field.onChange(newValue)
      }}
    />
  )
}

const styles = StyleSheet.create({
  dropdownOpen: {
    position: 'relative',
    top: 0,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    marginBottom: 10
  }
})
