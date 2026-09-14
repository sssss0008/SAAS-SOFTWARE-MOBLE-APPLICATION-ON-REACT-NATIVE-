import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Platform, Dimensions, Animated as RNAnimated } from 'react-native';
import Animated, { FadeInDown, Layout, useAnimatedStyle, useSharedValue, withSpring, interpolate } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Swipeable } from 'react-native-gesture-handler';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const DUMMY_USERS = [
  { id: '1', name: 'Alice Smith', email: 'alice@example.com', role: 'Admin', status: 'Active', color: '#8b5cf6', lastLogin: '2 mins ago', phone: '+1 234 567 890' },
  { id: '2', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Active', color: '#ec4899', lastLogin: '1 hour ago', phone: '+1 234 567 891' },
  { id: '3', name: 'Charlie Davis', email: 'charlie@example.com', role: 'User', status: 'Inactive', color: '#14b8a6', lastLogin: '3 days ago', phone: '+1 234 567 892' },
  { id: '4', name: 'Diana Miller', email: 'diana@example.com', role: 'Manager', status: 'Active', color: '#f59e0b', lastLogin: 'Just now', phone: '+1 234 567 893' },
  { id: '5', name: 'Evan Wright', email: 'evan@example.com', role: 'User', status: 'Suspended', color: '#3b82f6', lastLogin: '1 week ago', phone: '+1 234 567 894' },
];

const UserCard = ({ item, index }: { item: typeof DUMMY_USERS[0], index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const height = useSharedValue(0);
  const swipeableRef = useRef<Swipeable>(null);

  const toggleExpand = () => {
    Haptics.selectionAsync();
    setExpanded(!expanded);
    height.value = withSpring(expanded ? 0 : 80, { damping: 15 });
  };

  const expandStyle = useAnimatedStyle(() => ({
    height: height.value,
    opacity: height.value / 80,
    overflow: 'hidden'
  }));

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return '#10b981';
      case 'Inactive': return '#94a3b8';
      case 'Suspended': return '#ef4444';
      default: return '#64748b';
    }
  };

  const renderRightActions = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.swipeActionsContainer}>
        <TouchableOpacity style={[styles.swipeActionBtn, styles.editAction]} onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); swipeableRef.current?.close(); }}>
          <RNAnimated.View style={{ transform: [{ scale }] }}>
            <Ionicons name="pencil" size={24} color="#fff" />
          </RNAnimated.View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.swipeActionBtn, styles.deleteAction]} onPress={() => { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning); swipeableRef.current?.close(); }}>
          <RNAnimated.View style={{ transform: [{ scale }] }}>
            <Ionicons name="trash" size={24} color="#fff" />
          </RNAnimated.View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify()}
      layout={Layout.springify()}
    >
      <Swipeable
        ref={swipeableRef}
        renderRightActions={renderRightActions}
        friction={2}
        rightThreshold={40}
      >
        <TouchableOpacity style={styles.userCard} activeOpacity={0.9} onPress={toggleExpand}>
          <View style={styles.cardHeader}>
            <View style={styles.userInfo}>
              <View style={[styles.avatar, { backgroundColor: item.color + '20' }]}>
                <Text style={[styles.avatarText, { color: item.color }]}>{item.name.charAt(0)}</Text>
              </View>
              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
            </View>
            <View style={styles.metaInfo}>
              <Text style={styles.role}>{item.role}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '15' }]}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
              </View>
            </View>
          </View>

          <Animated.View style={expandStyle}>
            <View style={styles.expandedContent}>
              <View style={styles.expandedRow}>
                <Ionicons name="call-outline" size={16} color="#64748b" />
                <Text style={styles.expandedText}>{item.phone}</Text>
              </View>
              <View style={styles.expandedRow}>
                <Ionicons name="time-outline" size={16} color="#64748b" />
                <Text style={styles.expandedText}>Last login: {item.lastLogin}</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionBtnText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, styles.actionBtnDanger]}>
                  <Text style={styles.actionBtnTextDanger}>Revoke Access</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Swipeable>
    </Animated.View>
  );
};

const SpeedDialFAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useSharedValue(0);

  const toggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsOpen(!isOpen);
    animation.value = withSpring(isOpen ? 0 : 1, { damping: 15, stiffness: 150 });
  };

  const rotation = useAnimatedStyle(() => ({
    transform: [{ rotate: `${interpolate(animation.value, [0, 1], [0, 45])}deg` }]
  }));

  const action1Style = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(animation.value, [0, 1], [0, -70]) },
      { scale: interpolate(animation.value, [0, 1], [0.5, 1]) }
    ],
    opacity: animation.value
  }));

  const action2Style = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(animation.value, [0, 1], [0, -135]) },
      { scale: interpolate(animation.value, [0, 1], [0.5, 1]) }
    ],
    opacity: animation.value
  }));

  return (
    <View style={styles.fabContainer}>
      <Animated.View style={[styles.dialActionContainer, action2Style]}>
        <Text style={styles.dialLabel}>Export CSV</Text>
        <TouchableOpacity style={[styles.dialActionBtn, { backgroundColor: '#10b981' }]} activeOpacity={0.8} onPress={toggle}>
          <Ionicons name="download-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.dialActionContainer, action1Style]}>
        <Text style={styles.dialLabel}>Invite User</Text>
        <TouchableOpacity
          style={[styles.dialActionBtn, { backgroundColor: '#8b5cf6' }]}
          activeOpacity={0.8}
          onPress={() => {
            toggle();
            router.push('/(modals)/invite');
          }}
        >
          <Ionicons name="person-add-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity style={styles.fab} activeOpacity={0.9} onPress={toggle}>
        <Animated.View style={rotation}>
          <Ionicons name="add" size={32} color="#ffffff" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default function UsersScreen() {
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredUsers = DUMMY_USERS.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.header}>
        <View style={[styles.searchContainer, isFocused && styles.searchFocused]}>
          <Ionicons name="search" size={20} color={isFocused ? '#2a5298' : '#94a3b8'} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search team members..."
            placeholderTextColor="#94a3b8"
            value={search}
            onChangeText={setSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={20} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => <UserCard item={item} index={index} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <SpeedDialFAB />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1,
  },
  searchFocused: {
    borderColor: '#2a5298',
    shadowOpacity: 0.05,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0f172a',
    height: '100%',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 120 : 100,
  },
  swipeActionsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    marginLeft: 12,
  },
  swipeActionBtn: {
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 8,
  },
  editAction: {
    backgroundColor: '#3b82f6',
  },
  deleteAction: {
    backgroundColor: '#ef4444',
  },
  userCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#64748b',
  },
  metaInfo: {
    alignItems: 'flex-end',
  },
  role: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '600',
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  expandedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  expandedText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 8,
  },
  actionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  actionBtnDanger: {
    backgroundColor: '#fef2f2',
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  actionBtnTextDanger: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
  },
  fabContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 90,
    right: 24,
    alignItems: 'flex-end',
  },
  dialActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 4,
  },
  dialLabel: {
    backgroundColor: '#ffffff',
    color: '#0f172a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 12,
    fontSize: 14,
    fontWeight: '600',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dialActionBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2a5298',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2a5298',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 10,
  }
});
