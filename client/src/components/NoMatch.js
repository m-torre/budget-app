import React from 'react'
import { useAuth } from '../contexts/authContext'
import {
  Avatar,
  Card,
  CardContent,
  Container,
  Link,
  Typography
} from '@mui/material'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'

const NoMatch = () => {
  const { user } = useAuth()
  
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        paddingTop: user ? 0 : 5,
        paddingBottom: 10.5
      }}
    >
      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2
          }}
        >
          { !user && (
          <Typography
            component="h1"
            variant='h3'
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: 0.5,
              marginBottom: 1
            }}
          >
            <MonetizationOnIcon
              color="primary"
              fontSize='inherit'
            />
            Budget App
          </Typography>
          )}
          <Avatar
            sx={{
              bgcolor: 'error.main',
              width: 56,
              height: 56
            }}
          >
            404
          </Avatar>
          <Typography variant="h4">
            Page not found
          </Typography>
          <Link
            variant="body1"
            color="text.secondary"
            href={user ? "/home" : "/"}
          >
            {user ? "Return to home" : "Go to login"}
          </Link>
        </CardContent>
      </Card>
    </Container>
  )
}

export default NoMatch