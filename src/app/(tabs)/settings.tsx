import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  const renderMenuItem = (icon: any, title: string, subtitle?: string, delay: number = 0) => (
    <Animated.View entering={FadeInDown.delay(delay).springify()}>
      <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
        <View style={styles.menuIconBox}>
          <Ionicons name={icon} size={22} color="#2a5298" />
        </View>
        <View style={styles.menuTextContainer}>
          <Text style={styles.menuText}>{title}</Text>
          {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
        </View>
        <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.profileSection}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>A</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Admin User</Text>
          <Text style={styles.profileEmail}>admin@saashub.com</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.section}>
        <Animated.Text entering={FadeInDown.delay(200).springify()} style={styles.sectionTitle}>
          Workspace
        </Animated.Text>
        <View style={styles.card}>
          {renderMenuItem("business-outline", "Organization Profile", "Manage details", 250)}
          <View style={styles.divider} />
          {renderMenuItem("people-outline", "Team Members", "Invite & manage roles", 300)}
          <View style={styles.divider} />
          {renderMenuItem("card-outline", "Billing & Plans", "Next billing: Oct 1, 2026", 350)}
        </View>
      </View>

      <View style={styles.section}>
        <Animated.Text entering={FadeInDown.delay(400).springify()} style={styles.sectionTitle}>
          Preferences
        </Animated.Text>
        <View style={styles.card}>
          {renderMenuItem("notifications-outline", "Notifications", "Email & push alerts", 450)}
          <View style={styles.divider} />
          {renderMenuItem("shield-checkmark-outline", "Security", "2FA & sessions", 500)}
          <View style={styles.divider} />
          {renderMenuItem("color-palette-outline", "Appearance", "Light theme", 550)}
        </View>
      </View>

      <Animated.View entering={FadeInDown.delay(650).springify()}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={22} color="#ef4444" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.Text entering={FadeInDown.delay(700).springify()} style={styles.versionText}>
        App Version 1.0.0
      </Animated.Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 120 : 100,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileAvatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4f46e5',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#64748b',
  },
  editButton: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94a3b8',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginLeft: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 20,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuText: {
    fontSize: 16,
    color: '#0f172a',
    fontWeight: '600',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#64748b',
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginLeft: 76,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef2f2',
    padding: 18,
    borderRadius: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '700',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#cbd5e1',
    marginTop: 24,
    fontWeight: '500',
  }
});
