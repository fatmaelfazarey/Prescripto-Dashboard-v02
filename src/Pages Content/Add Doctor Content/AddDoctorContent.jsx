import React, { useContext, useState } from "react";
import styles from './AddDoctorContent.module.css';
import PageTitle from "../../Components/PageTitle";
import { assets } from '../../assets/assets';
import { AppContext } from "../../Context/AppContext";

const AddDoctorContent = () => {
  // const url = `https://serverv02.vercel.app/`;
  const speciality = ['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'];
  const experience = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '+10'];
  const { url } = useContext(AppContext);

  const [formData, setFormData] = useState({
    _id: '',
    image: '',
    name: '',
    speciality: speciality[0], // Set default value
    email: '',
    password: '',
    education: '',
    address: '',
    address2: '',
    experience: experience[0], // Set default value
    fees: '',
    about: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: URL.createObjectURL(file),
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.education.trim()) newErrors.education = 'Education is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.fees) newErrors.fees = 'Fees is required';
    if (!formData.about.trim()) newErrors.about = 'About me is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${url}doctors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: formData.image || assets.default_patient_image
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSuccessMessage('Doctor added successfully!');

      // Reset form
      setFormData({
        _id: '',
        image: '',
        name: '',
        speciality: speciality[0],
        email: '',
        password: '',
        education: '',
        address: '',
        address2: '',
        experience: experience[0],
        fees: '',
        about: '',
      });
    } catch (error) {
      console.error('Error adding doctor:', error);
      setErrors({ submit: 'Failed to add doctor. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='d-flex flex-column p-4 gap-3 w-100 content'>
      <PageTitle title='Add Doctor' />
      <div className={`${styles.form} p-3 w-100 ${styles.border_rad}`}>
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        {errors.submit && (
          <div className="alert alert-danger" role="alert">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={`${styles.m_bottom} d-flex align-items-center gap-2 flex-wrap`}>
            <div className={`position-relative`}>
              <img
                src={formData.image || assets.default_patient_image}
                alt='doctor'
                width='200'
                height='200'
                className={styles.docImage}
              />
              <input
                type="file"
                accept="image/*"
                className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <p className={styles.label}>Upload doctor picture</p>
              <input
                type="text"
                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                placeholder="Doctor image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
          </div>

          <div className="d-flex gap-3 flex-column flex-md-row">
            <div className="form-group w-100">
              <label className={styles.label} htmlFor="name">Doctor name*</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="form-group w-100">
              <label className={styles.label} htmlFor="speciality">Speciality*</label>
              <select
                id="speciality"
                className={`form-control ${errors.speciality ? 'is-invalid' : ''}`}
                value={formData.speciality}
                onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
              >
                {speciality.map((s, i) => (
                  <option value={s} key={i}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="d-flex gap-3 flex-column flex-md-row">
            <div className="form-group w-100">
              <label className={styles.label} htmlFor="email">Email*</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="form-group w-100">
              <label className={styles.label} htmlFor="password">Password*</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                placeholder="Password (min 6 characters)"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
          </div>

          <div className="d-flex gap-3 flex-column flex-md-row">
            <div className="form-group w-100">
              <label className={styles.label} htmlFor="experience">Experience</label>
              <select
                id="experience"
                className="form-control"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              >
                {experience.map((s, i) => (
                  <option value={s} key={i}>{s}</option>
                ))}
              </select>
            </div>
            <div className="form-group w-100">
              <label className={styles.label} htmlFor="fees">Fees*</label>
              <input
                type="number"
                className={`form-control ${errors.fees ? 'is-invalid' : ''}`}
                id="fees"
                placeholder="Your fees"
                value={formData.fees}
                onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
              />
              {errors.fees && <div className="invalid-feedback">{errors.fees}</div>}
            </div>
          </div>

          <div className="d-flex gap-3 flex-column flex-md-row">
            <div className="form-group w-100">
              <label className={styles.label} htmlFor="education">Education*</label>
              <input
                type="text"
                className={`form-control ${errors.education ? 'is-invalid' : ''}`}
                id="education"
                placeholder="Education"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              />
              {errors.education && <div className="invalid-feedback">{errors.education}</div>}
            </div>
            <div className="form-group w-100">
              <label className={styles.label} htmlFor="address">Address*</label>
              <input
                type="text"
                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                id="address"
                placeholder="1234 Main St"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              <input
                type="text"
                className="form-control mt-2"
                id="address2"
                placeholder="Apartment, studio, or floor"
                value={formData.address2}
                onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
              />
              {errors.address && <div className="invalid-feedback">{errors.address}</div>}
            </div>
          </div>

          <div className="form-group">
            <label className={styles.label} htmlFor="about">About me*</label>
            <textarea
              rows="3"
              id="about"
              className={`form-control ${errors.about ? 'is-invalid' : ''}`}
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
            ></textarea>
            {errors.about && <div className="invalid-feedback">{errors.about}</div>}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Doctor'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorContent;