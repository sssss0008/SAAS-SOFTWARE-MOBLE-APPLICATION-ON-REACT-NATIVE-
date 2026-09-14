import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

export default function InviteScreen() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('User');

  const handleInvite = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  const roles = [
    { id: 'Admin', icon: 'shield-checkmark' },
    { id: 'Manager', icon: 'briefcase' },
    { id: 'User', icon: 'person' }
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#94a3b8" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="colleague@company.com"
              placeholderTextColor="#cbd5e1"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoFocus
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Assign Role</Text>
          <View style={styles.rolesContainer}>
            {roles.map((r) => (
              <TouchableOpacity
                key={r.id}
                style={[styles.roleCard, role === r.id && styles.roleCardActive]}
                onPress={() => {
                  Haptics.selectionAsync();
                  setRole(r.id);
                }}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={r.icon as any}
                  size={24}
                  color={role === r.id ? '#2a5298' : '#94a3b8'}
                  style={styles.roleIcon}
                />
                <Text style={[styles.roleText, role === r.id && styles.roleTextActive]}>
                  {r.id}
                </Text>
                {role === r.id && (
                  <View style={styles.checkBadge}>
                    <Ionicons name="checkmark" size={14} color="#ffffff" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleInvite} activeOpacity={0.9}>
          <LinearGradient colors={['#1e3c72', '#2a5298']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Send Invitation</Text>
            <Ionicons name="paper-plane" size={18} color="#ffffff" style={styles.buttonIcon} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 24,
    flex: 1,
  },
  formGroup: {
    marginBottom: 32,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#0f172a',
    height: '100%',
  },
  rolesContainer: {
    gap: 12,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
  },
  roleCardActive: {
    borderColor: '#2a5298',
    backgroundColor: '#f0f4f8',
  },
  roleIcon: {
    marginRight: 16,
  },
  roleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    flex: 1,
  },
  roleTextActive: {
    color: '#0f172a',
    fontWeight: '700',
  },
  checkBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2a5298',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 24,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  button: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#2a5298',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonGradient: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginLeft: 10,
  }
});
