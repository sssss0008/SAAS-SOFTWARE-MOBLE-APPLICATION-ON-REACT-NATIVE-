import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back, Admin</Text>
        <Text style={styles.subtitle}>Here is your SaaS overview</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Total Users</Text>
          <Text style={styles.statValue}>1,284</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Active Subs</Text>
          <Text style={styles.statValue}>842</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Monthly MRR</Text>
          <Text style={styles.statValue}>$12.4k</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Growth</Text>
          <Text style={styles.statValue}>+14%</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>New user signup: john.doe@example.com</Text>
          <Text style={styles.activityTime}>2 mins ago</Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>Subscription upgraded: TechCorp Inc.</Text>
          <Text style={styles.activityTime}>1 hour ago</Text>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityText}>Payment received: $49.00</Text>
          <Text style={styles.activityTime}>3 hours ago</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 24,
    paddingTop: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  statCard: {
    backgroundColor: '#ffffff',
    width: '46%',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statTitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  activityItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  activityText: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  }
});
