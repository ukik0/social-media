import { ProfilePage } from '@/pages';

import { NextPageAuth } from '@/provider';

const Profile: NextPageAuth = () => {
    return <ProfilePage />;
};

Profile.isAuth = false;

export default Profile;
