import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { profileService } from '../../../services/profileService';
import { Loader2 } from 'lucide-react';
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
            <div className="flex items-center justify-center h-full p-20">
                <Loader2 className="animate-spin text-primary-600" size={40} />
            </div>
        );
    }

    return (
        <div className="dashboard-page max-w-5xl mx-auto space-y-6 pb-20">
            {/* Header Section */}
            <ProfileHeader
                user={user}
                profile={profile}
                onUpdate={handleUpdate}
                isOwnProfile={true}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
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
                <div className="space-y-6">
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
    );
};

export default StudentProfile;
