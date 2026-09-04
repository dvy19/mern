import React, { useEffect, useState } from 'react'
import NgoDetailsCard from '../../../components/NgoDetailsCard'
import Navbar from '../../../components/navbar/Navbar'
import CampaignCard from '../../../components/CampaignCard'
import { ngoService } from '../../../service/ngoService'
import { useParams } from 'react-router-dom'
import '../ngoDash/NgoDashboard.css'

const NgoProfile = () => {
  const { id } = useParams()

  const [camp, setCamp] = useState([])
  const [campCount, setCampCount] = useState(0)

  const getCampaigns = async (active, id) => {
    console.log("🔥 getCampaigns CALLED", active, id)
    try {
      const response = await ngoService.getAllCampaigns(active, id)

      console.log("CAMPAIGN RESPONSE:", response)

      setCamp(response.campaign || [])
      setCampCount(response.count || 0)
    } catch (err) {
      console.log("CAMPAIGN ERROR:", err)
    }
  }

  useEffect(() => {
    if (id) {
      getCampaigns(true, id)
    }
  }, [id])

  console.log("CAMP STATE:", camp)

  return (
    <div>

      <NgoDetailsCard  />

      <div className="ngo-list-horizontal">
        {camp.length > 0 ? (
          camp.map((item) => (
            <CampaignCard
              key={item._id}
              camp={item}
            />
          ))
        ) : (
          <p>No active campaigns found.</p>
        )}
      </div>
    </div>
  )
}

export default NgoProfile