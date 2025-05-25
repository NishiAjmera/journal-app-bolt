import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Bell, Moon, Award, ChartBar as BarChart2, Settings, ChevronRight } from 'lucide-react-native';
import Header from '@/components/Header';
import { colors } from '@/constants/colors';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <Header title="Profile" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.profileImage}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=200' }} 
              style={styles.image}
            />
          </View>
          <Text style={styles.profileName}>Emma Johnson</Text>
          <Text style={styles.profileBio}>Journal enthusiast | Growth mindset</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Entries</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>7</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4</Text>
              <Text style={styles.statLabel}>Badges</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>My Achievements</Text>
          <View style={styles.achievementsContainer}>
            <View style={styles.achievement}>
              <View style={[styles.achievementIcon, { backgroundColor: colors.primary[500] }]}>
                <Award size={20} color={colors.white} />
              </View>
              <Text style={styles.achievementTitle}>First Week</Text>
            </View>
            <View style={styles.achievement}>
              <View style={[styles.achievementIcon, { backgroundColor: colors.secondary[500] }]}>
                <BarChart2 size={20} color={colors.white} />
              </View>
              <Text style={styles.achievementTitle}>Consistent</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.settingsGroup}>
            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <Bell size={20} color={colors.neutral[700]} style={styles.settingsIcon} />
                <Text style={styles.settingsItemText}>Notifications</Text>
              </View>
              <ChevronRight size={20} color={colors.neutral[400]} />
            </TouchableOpacity>
            
            <View style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <Moon size={20} color={colors.neutral[700]} style={styles.settingsIcon} />
                <Text style={styles.settingsItemText}>Dark Mode</Text>
              </View>
              <Switch 
                trackColor={{ false: colors.neutral[300], true: colors.primary[400] }}
                thumbColor={colors.white}
              />
            </View>
            
            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingsItemLeft}>
                <Settings size={20} color={colors.neutral[700]} style={styles.settingsIcon} />
                <Text style={styles.settingsItemText}>Preferences</Text>
              </View>
              <ChevronRight size={20} color={colors.neutral[400]} />
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.neutral[200],
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: colors.neutral[900],
    marginBottom: 4,
  },
  profileBio: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[600],
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.primary[600],
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.neutral[600],
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: colors.neutral[900],
    marginBottom: 16,
  },
  achievementsContainer: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  achievement: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  achievementTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral[800],
  },
  settingsGroup: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsIcon: {
    marginRight: 16,
  },
  settingsItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.neutral[800],
  },
  logoutButton: {
    marginHorizontal: 16,
    backgroundColor: colors.neutral[100],
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.error[600],
  },
});