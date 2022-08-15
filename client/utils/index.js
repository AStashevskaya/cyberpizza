import { Builder, builder } from '@builder.io/sdk'

export function restrictedRegister(component, options, models) {
  if (!Builder.isEditing || (models && models.includes(builder.editingModel))) {
    return Builder.registerComponent(component, options)
  }
}
