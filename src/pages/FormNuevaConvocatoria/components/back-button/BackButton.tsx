import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './BackButton.css'

interface BackButtonProps {
  className?: string
}

const BackButton: React.FC<BackButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <button 
      onClick={handleBack}
      className={`back-button ${className}`}
      aria-label="Volver atrás"
    >
      <ArrowLeft className="back-button-icon" />
      Volver
    </button>
  )
}

export default BackButton;
