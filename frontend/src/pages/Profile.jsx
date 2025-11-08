import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    headline: '',
    bio: '',
    location: '',
    website: '',
  });
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  const isOwnProfile = currentUser?._id === id;

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const { data } = await api.get(`/users/${id}`);
      setUser(data);
      setFormData({
        name: data.name,
        headline: data.headline || '',
        bio: data.bio || '',
        location: data.location || '',
        website: data.website || '',
      });
      setSkills(data.skills || []);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load user:', err);
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put('/users/profile', formData);
      setUser({ ...user, ...data });
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Failed to update profile');
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;
    try {
      const updatedSkills = [...skills, newSkill.trim()];
      await api.put('/users/skills', { skills: updatedSkills });
      setSkills(updatedSkills);
      setNewSkill('');
    } catch (err) {
      console.error('Failed to add skill:', err);
    }
  };

  const handleRemoveSkill = async (skillToRemove) => {
    try {
      const updatedSkills = skills.filter(s => s !== skillToRemove);
      await api.put('/users/skills', { skills: updatedSkills });
      setSkills(updatedSkills);
    } catch (err) {
      console.error('Failed to remove skill:', err);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Present';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p className="mt-4 text-gray-600">User not found</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header Card */}
          <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
            {/* Banner Photo */}
            <div 
              className="h-48 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
              style={user.bannerPhoto && user.bannerPhoto !== 'https://via.placeholder.com/1200x300/0077B5/FFFFFF?text=LinkedIn+Clone' ? {
                backgroundImage: `url(${user.bannerPhoto})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              } : {}}
            >
              {isOwnProfile && (
                <div className="flex justify-end p-4">
                  <button className="bg-white/90 hover:bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition">
                    📷 Edit banner
                  </button>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="px-6 pb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-20">
                <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-4">
                  {/* Profile Photo */}
                  <div className="relative">
                    {user.profilePhoto && user.profilePhoto !== 'https://via.placeholder.com/150/0077B5/FFFFFF?text=User' ? (
                      <img
                        src={user.profilePhoto}
                        alt={user.name}
                        className="w-36 h-36 rounded-full border-4 border-white object-cover shadow-lg"
                      />
                    ) : (
                      <div className="w-36 h-36 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-5xl shadow-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {isOwnProfile && (
                      <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition">
                        📷
                      </button>
                    )}
                  </div>

                  <div className="text-center sm:text-left pb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{user.name}</h1>
                    <p className="text-lg text-gray-700 mt-1">
                      {user.headline || (isOwnProfile ? 'Add a headline' : 'No headline')}
                    </p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2 text-sm text-gray-600">
                      {user.location && (
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {user.location}
                        </span>
                      )}
                      {user.connections && user.connections.length > 0 && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                            {user.connections.length} connections
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {isOwnProfile && !isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 sm:mt-0 sm:mb-2 bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-sm"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {/* Edit Mode */}
              {isEditing && (
                <form onSubmit={handleUpdate} className="mt-6 space-y-4 border-t pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
                      <input
                        type="text"
                        value={formData.headline}
                        onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Software Engineer at Google"
                        maxLength={120}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., San Francisco, CA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows="4"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tell us about yourself, your achievements, and what you're passionate about..."
                      maxLength={2000}
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/2000 characters</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: user.name,
                          headline: user.headline || '',
                          bio: user.bio || '',
                          location: user.location || '',
                          website: user.website || '',
                        });
                      }}
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* About Section */}
          {!isEditing && user.bio && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{user.bio}</p>
            </div>
          )}

          {/* Skills Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
              {isOwnProfile && (
                <button
                  onClick={() => setEditingSection(editingSection === 'skills' ? null : 'skills')}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  {editingSection === 'skills' ? 'Done' : '+ Add skill'}
                </button>
              )}
            </div>

            {editingSection === 'skills' && (
              <div className="mb-4 flex space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  placeholder="Add a skill (e.g., JavaScript)"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddSkill}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Add
                </button>
              </div>
            )}

            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
                  >
                    <span>{skill}</span>
                    {isOwnProfile && editingSection === 'skills' && (
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-blue-600 hover:text-blue-800 ml-2"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                {isOwnProfile ? 'Add skills to showcase your expertise' : 'No skills listed'}
              </p>
            )}
          </div>

          {/* Experience Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
              {isOwnProfile && (
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  + Add experience
                </button>
              )}
            </div>

            {user.experience && user.experience.length > 0 ? (
              <div className="space-y-4">
                {user.experience.map((exp, index) => (
                  <div key={index} className="flex space-x-3 pb-4 border-b last:border-b-0">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-600 font-semibold">
                        {exp.company.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700">{exp.company}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </p>
                      {exp.location && <p className="text-sm text-gray-500">{exp.location}</p>}
                      {exp.description && (
                        <p className="mt-2 text-sm text-gray-700">{exp.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                {isOwnProfile ? 'Add your work experience to build your professional profile' : 'No experience listed'}
              </p>
            )}
          </div>

          {/* Education Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Education</h2>
              {isOwnProfile && (
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  + Add education
                </button>
              )}
            </div>

            {user.education && user.education.length > 0 ? (
              <div className="space-y-4">
                {user.education.map((edu, index) => (
                  <div key={index} className="flex space-x-3 pb-4 border-b last:border-b-0">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-600 font-semibold">
                        🎓
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                      <p className="text-gray-700">{edu.degree}</p>
                      {edu.fieldOfStudy && <p className="text-gray-600">{edu.fieldOfStudy}</p>}
                      <p className="text-sm text-gray-500">
                        {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                      </p>
                      {edu.description && (
                        <p className="mt-2 text-sm text-gray-700">{edu.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                {isOwnProfile ? 'Add your education to showcase your academic background' : 'No education listed'}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
