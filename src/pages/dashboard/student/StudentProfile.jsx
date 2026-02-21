import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { profileService } from '../../../services/profileService';
import { Loader2 } from 'lucide-react';
import './student.css';
import {
    ProfileHeader,
    AboutSection
} from '../../../components/profile/ProfileSections';
import {
    EducationSection,
    ExperienceSection
} from '../../../components/profile/ExperienceEducation';
import {
    PortfolioSection,
    SocialLinksSection,
    CertificationSection
} from '../../../components/profile/PortfolioLinks';

const StudentProfile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const data = await profileService.getCurrentProfile();
            // If no profile exists, data might be null or empty object, handle gracefully
            setProfile(data || {
                bio: '', skills: [], education: [], experience: [], projects: [], certifications: [], socialLinks: {}
            });
        } catch (error) {
            console.error("Failed to load profile", error);
            // Initialize empty profile structure on error/404
            setProfile({
                bio: '', skills: [], education: [], experience: [], projects: [], certifications: [], socialLinks: {}
            });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (updates) => {
        try {
            const updatedProfile = await profileService.updateProfile(updates);
            setProfile(updatedProfile);
        } catch (error) {
            console.error("Failed to update profile", error);
            alert("Failed to save changes. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="profile-loading-state">
                <Loader2 className="animate-spin text-primary-600" size={48} />
            </div>
        );
    }

    return (
        <div className="dashboard-page profile-scroll-container">
            <div className="student-profile-container">
                {/* Header Section */}
                <ProfileHeader
                    user={user}
                    profile={profile}
                    onUpdate={handleUpdate}
                    isOwnProfile={true}
                />

                <div className="student-grid-layout mt-lg">
                    {/* Main Content */}
                    <div className="profile-main-stack">
                        <AboutSection
                            user={user}
                            profile={profile}
                            onUpdate={handleUpdate}
                            isOwnProfile={true}
                        />

                        <ExperienceSection
                            experience={profile.experience}
                            onUpdate={handleUpdate}
                            isOwnProfile={true}
                        />

                        <EducationSection
                            education={profile.education}
                            onUpdate={handleUpdate}
                            isOwnProfile={true}
                        />

                        <PortfolioSection
                            projects={profile.projects}
                            onUpdate={handleUpdate}
                            isOwnProfile={true}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="flex-col gap-lg">
                        <SocialLinksSection
                            socialLinks={profile.socialLinks}
                            onUpdate={handleUpdate}
                            isOwnProfile={true}
                        />

                        <CertificationSection
                            certifications={profile.certifications}
                            onUpdate={handleUpdate}
                            isOwnProfile={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
