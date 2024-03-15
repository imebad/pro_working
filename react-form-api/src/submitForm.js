import React, { useState } from 'react'

function SubmitForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    country: '',
    source: '',
    sub_source: '',
    campaign: '',
    type: '',
    listing_reference: '',
    medium: '',
    notes: '',
  })

  const [error, setError] = useState('')

  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form data submitted:', formData)

    try {
      // Example of calling an API
      const response = await fetch('https://dev.rexcrm.com/leads', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          country: formData.country,
          source: formData.source,
          sub_source: formData.sub_source,
          campaign: formData.campaign,
          type: formData.type,
          listing_reference: formData.listing_reference,
          medium: formData.medium,
          notes: formData.notes,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(setSuccess('Record updated successfully'))

      const data = await response.json()
      console.log(data)
      console.log('Success')
      setError('')
    } catch (error) {
      console.log('Getting Errors')
      setError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="mb-3">
        <label htmlFor="nameInput" className="form-label">
          Name*:
        </label>
        <input
          type="text"
          className="form-control"
          id="nameInput"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="emailInput" className="form-label">
          Email*:
        </label>
        <input
          type="email"
          className="form-control"
          id="emailInput"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phoneInput" className="form-label">
          Phone Number*:
        </label>
        <input
          type="tel"
          className="form-control"
          id="phoneInput"
          name="phoneNumber"
          required
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="countryInput" className="form-label">
          Country*:
        </label>
        <input
          type="text"
          className="form-control"
          id="countryInput"
          name="country"
          required
          value={formData.country}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="sourceInput" className="form-label">
          Source*:
        </label>
        <input
          type="text"
          className="form-control"
          id="sourceInput"
          name="source"
          required
          value={formData.source}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="sub_sourceInput" className="form-label">
          Sub Source*:
        </label>
        <input
          type="text"
          className="form-control"
          id="sub_sourceInput"
          name="sub_source"
          required
          value={formData.sub_source}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="campaignInput" className="form-label">
          Campaign*:
        </label>
        <input
          type="text"
          className="form-control"
          id="campaignInput"
          name="campaign"
          required
          value={formData.campaign}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="typeInput" className="form-label">
          Type:
        </label>
        <input
          type="text"
          className="form-control"
          id="typeInput"
          name="type"
          value={formData.type}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="listing_referenceInput" className="form-label">
          Listing Reference:
        </label>
        <input
          type="text"
          className="form-control"
          id="listing_reference"
          name="type"
          value={formData.listing_reference}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
    </form>
  )
}

export default SubmitForm
