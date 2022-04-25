import React, { useState } from 'react'
import useBudgets from '../hooks/useBudgets'
import useTransactions from '../hooks/useTransactions'
import useProgressBar from '../hooks/useProgressBar'
import { getAmount } from '../utils'
import { useTheme } from '@mui/material/styles'
import {
  Box,
  Button,
  Card,
  CardContent,
  MobileStepper,
  LinearProgress,
  Typography
} from '@mui/material'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { GiPiggyBank } from 'react-icons/gi'

const BudgetsStepper = () => {
  const [activeStep, setActiveStep] = useState(0)
  const theme = useTheme()
  const transactions = useTransactions()
  const budgets = useBudgets()
  const maxSteps = budgets.list.length
  const spent = budgets.list.length > 0 ? Math.abs(getAmount(transactions.filterCategory(budgets.list[activeStep].category))).toFixed(2) : 0
  const budgetAmount = budgets.list.length > 0 ? budgets.list[activeStep].amount.toFixed(2) : 0
  const barControl = useProgressBar(spent, budgetAmount)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2
        }}
      >
        <Typography
          variant='h4'
          sx={{
            display: "flex",
            alignItems: "center",
            columnGap: 1
          }}
        >
          <GiPiggyBank />
          Budgets
        </Typography>
        { budgets.list.length > 0
          ? (
            <>
              <Typography variant="h5">
                {budgets.list[activeStep].category}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <Typography
                  variant="h6"
                  align="center"
                >
                  ${spent}
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                >
                  &nbsp;/ ${budgetAmount}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={barControl.getProgressBarValue()}
                color={barControl.getProgressBarColor()}
                sx={{ width: '80%' }}
              />
              <MobileStepper
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                  <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                  >
                    Next
                    {
                      theme.direction === 'rtl'
                      ? <KeyboardArrowLeft />
                      : <KeyboardArrowRight />
                    }
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    {
                      theme.direction === 'rtl'
                      ? <KeyboardArrowRight />
                      : <KeyboardArrowLeft />
                    }
                    Back
                  </Button>
                }
                sx={{
                  width: "80%",
                  bgcolor: "background.paper"
                }}
              />
            </>
          )
          : <Typography variant='body1' align='center'>No budgets yet</Typography>
        }
      </CardContent>
    </Card>
  )
}

export default BudgetsStepper