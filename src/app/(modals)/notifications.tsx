import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const NOTIFICATIONS = [
  { id: '1', title: 'New subscription', desc: 'TechCorp upgraded to Enterprise', time: '10m ago', type: 'success', unread: true },
  { id: '2', title: 'System Alert', desc: 'Server load reached 85%', time: '1h ago', type: 'warning', unread: true },
  { id: '3', title: 'Payment failed', desc: 'Marketing LLC invoice #1023', time: '2h ago', type: 'error', unread: false },
  { id: '4', title: 'New User Signup', desc: 'john.doe@example.com joined', time: '5h ago', type: 'info', unread: false },
];

export default function NotificationsScreen() {
  const getIconData = (type: string) => {
    switch(type) {
      case 'success': return { icon: 'checkmark-circle', color: '#10b981', bg: '#dcfce7' };
      case 'warning': return { icon: 'warning', color: '#f59e0b', bg: '#fef3c7' };
      case 'error': return { icon: 'alert-circle', color: '#ef4444', bg: '#fee2e2' };
      default: return { icon: 'information-circle', color: '#3b82f6', bg: '#dbeafe' };
    }
  };

  const renderItem = ({ item, index }: { item: typeof NOTIFICATIONS[0], index: number }) => {
    const iconData = getIconData(item.type);

    return (
      <Animated.View entering={FadeInDown.delay(index * 100).springify()}>
        <TouchableOpacity style={[styles.notificationCard, item.unread && styles.unreadCard]} activeOpacity={0.7}>
          <View style={[styles.iconBox, { backgroundColor: iconData.bg }]}>
            <Ionicons name={iconData.icon as any} size={22} color={iconData.color} />
          </View>
          <View style={styles.content}>
            <View style={styles.headerRow}>
              <Text style={[styles.title, item.unread && styles.unreadText]}>{item.title}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
          {item.unread && <View style={styles.unreadDot} />}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  unreadCard: {
    borderColor: '#e0e7ff',
    backgroundColor: '#f8fafc',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  unreadText: {
    color: '#0f172a',
    fontWeight: '800',
  },
  desc: {
    fontSize: 14,
    color: '#64748b',
  },
  time: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
    marginLeft: 12,
  }
});
