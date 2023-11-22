export const getErrorMessages = (error) => {
  const errorMessages = {}

  error.issues.forEach(issue => {
    const field = issue.path[0]
    const message = issue.message
    errorMessages[field] = message
  })

  return errorMessages
}
