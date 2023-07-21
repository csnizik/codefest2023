import React from 'react'
import { Stack, FAB } from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

const FABComponent = () => (
  <Stack fill center spacing={4}>
    <FAB icon={(props) => <Icon name="plus" {...props} />} />
    <FAB
      icon={(props) => <Icon name="plus" {...props} />}
      color="primary"
      loading
    />
    <FAB
      variant="extended"
      icon={(props) => <Icon name="navigation" {...props} />}
      label="navigate"
      color="primary"
    />
  </Stack>
)

export default FABComponent
