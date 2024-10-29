import './App.css'
import { TwitterFollowCard } from './TwitterFollowCards'

const users = [
  {
    userName: 'midudev',
    name: 'Miguel Ángel Durán',
    isFollowing: true
  },
  {
    userName: 'LinkedIn',
    name: 'LinkedIn',
    isFollowing: true
  },
  {
    userName: 'LaRevuelta_TVE',
    name: 'La Revuelta',
    isFollowing: true
  },
  {
    userName: 'El_Hormiguero',
    name: 'El Hormiguero',
    isFollowing: false
  }
]

export function App () {
  return (
    <section className='App'>
      {
        users.map(({ userName, name, isFollowing }) => (
          <TwitterFollowCard
            key={userName}
            userName={userName}
            initialIsFollowing={isFollowing}
          >
            {name}
          </TwitterFollowCard>
        ))
      }
    </section>
  )
}