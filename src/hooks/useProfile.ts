import { useLocalStorage } from './useLocalStorage';

export type Squad = 'spectre' | 'subsquad';
export type Role = 'admin' | 'member';

export interface UserProfile {
  callsign: string;
  name: string;
  squad: Squad;
  role: Role;
  onboarded: boolean;
}

const DEFAULT_PROFILE: UserProfile = {
  callsign: '',
  name: '',
  squad: 'spectre',
  role: 'member',
  onboarded: false,
};

export function useProfile() {
  const [profile, setProfile] = useLocalStorage<UserProfile>('ols8_profile', DEFAULT_PROFILE);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const completeOnboarding = (data: Omit<UserProfile, 'onboarded'>) => {
    setProfile({ ...data, onboarded: true });
  };

  return { profile, updateProfile, completeOnboarding };
}
