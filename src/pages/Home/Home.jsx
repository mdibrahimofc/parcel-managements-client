import Banner from '@/components/Home/Banner'
import DeliveryProcess from '@/components/Home/DeliveryProcess'
import DeliverySection from '@/components/Home/DeliverySection'
import Feauture from '@/components/Home/Feauture'
import JoinTheCrew from '@/components/Home/JoinTheCrew'
import StatisticsCards from '@/components/Home/StatisticsCards'
import TopDeliveryMen from '@/components/Home/TopDeliveryMen'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  return (
    <div className='dark:bg-gray-900'>
      <Helmet>
        <title> DropDesk | Home</title>
      </Helmet>
      <Banner/>
      <Feauture/>
      <StatisticsCards/>
      <DeliverySection/>
      <TopDeliveryMen/>
      <JoinTheCrew/>
      <DeliveryProcess/>
    </div>
  )
}

export default Home
