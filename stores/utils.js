export function autoInjectData (context, initialData) {
  if (initialData && typeof initialData === 'object') {
    Object.keys(initialData).forEach(key => {
      if (initialData[key]) {
        context[key] = initialData[key]
      }
    })
  }
}
