const serverUrl = 'http://localhost:3000'

export const toDoItemsApiUrl = id =>
  id ? `${serverUrl}/todo_items/${id}` : `${serverUrl}/todo_items`
