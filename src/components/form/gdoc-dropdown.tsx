import { useEffect, useState } from 'react'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker'

type Props = {
  field: ControllerRenderProps<FieldValues, string>,
  placeholder: string,
  items: ItemType<string>[]
}

export function GdocDropdown({field, placeholder, items}: Props) {
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
      listMode="SCROLLVIEW"
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
