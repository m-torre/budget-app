const useProgressBar = (spent, budgetAmount) => {
  const ratio = spent / budgetAmount

  const getProgressBarValue = () => {
    if (ratio > 1)
      return 100

    return ratio * 100
  }

  const getProgressBarColor = () => {
    if (ratio < .50) return "primary"
    if (ratio < .75) return "warning"
    return "error"
  }

  return {
    getProgressBarValue,
    getProgressBarColor
  }
}

export default useProgressBar