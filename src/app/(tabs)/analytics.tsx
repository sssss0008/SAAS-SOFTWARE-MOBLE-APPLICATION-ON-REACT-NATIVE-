import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const PERIODS = ['Day', 'Week', 'Month', 'Year'];
const METRICS = [
  { id: '1', title: 'New MRR', value: '$4,250', change: '+12%', positive: true, icon: 'cash' },
  { id: '2', title: 'Churn Rate', value: '2.4%', change: '-0.5%', positive: true, icon: 'exit' },
  { id: '3', title: 'Active Users', value: '1,893', change: '+5%', positive: true, icon: 'people' },
  { id: '4', title: 'Avg. Session', value: '4m 12s', change: '-10%', positive: false, icon: 'time' },
];

export default function AnalyticsScreen() {
  const [activePeriod, setActivePeriod] = useState('Month');

  const handlePeriodChange = (period: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActivePeriod(period);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Segmented Control */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.segmentedControl}>
          {PERIODS.map((period) => (
            <TouchableOpacity
              key={period}
              style={[styles.segmentBtn, activePeriod === period && styles.segmentBtnActive]}
              onPress={() => handlePeriodChange(period)}
              activeOpacity={0.8}
            >
              <Text style={[styles.segmentText, activePeriod === period && styles.segmentTextActive]}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        {/* Main Chart Placeholder (Simulated) */}
        <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.chartCard}>
          <Text style={styles.chartTitle}>Revenue Growth</Text>
          <Text style={styles.chartSubtitle}>vs previous {activePeriod.toLowerCase()}</Text>

          <View style={styles.chartPlaceholder}>
            {/* Mock bars for the chart */}
            {[40, 60, 45, 80, 50, 90, 75].map((h, i) => (
              <View key={i} style={styles.barColumn}>
                <LinearGradient
                  colors={['#1e3c72', '#2a5298']}
                  style={[styles.bar, { height: `${h}%` }]}
                  start={{x: 0, y: 0}} end={{x: 0, y: 1}}
                />
                <Text style={styles.barLabel}>{['M','T','W','T','F','S','S'][i]}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.Text entering={FadeInDown.delay(300).springify()} style={styles.sectionTitle}>
          Key Metrics
        </Animated.Text>

        <View style={styles.metricsGrid}>
          {METRICS.map((metric, index) => (
            <Animated.View key={metric.id} entering={FadeInDown.delay(350 + (index * 100)).springify()} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <View style={[styles.metricIconBox, { backgroundColor: metric.positive ? '#dcfce7' : '#fee2e2' }]}>
                  <Ionicons name={metric.icon as any} size={18} color={metric.positive ? '#16a34a' : '#ef4444'} />
                </View>
                <View style={[styles.trendBadge, { backgroundColor: metric.positive ? '#dcfce7' : '#fee2e2' }]}>
                  <Ionicons name={metric.positive ? "trending-up" : "trending-down"} size={12} color={metric.positive ? '#16a34a' : '#ef4444'} />
                  <Text style={[styles.trendText, { color: metric.positive ? '#16a34a' : '#ef4444' }]}>{metric.change}</Text>
                </View>
              </View>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricTitle}>{metric.title}</Text>
            </Animated.View>
          ))}
        </View>

      </ScrollView>
    </View>
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
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  segmentBtnActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  segmentTextActive: {
    color: '#0f172a',
    fontWeight: '700',
  },
  chartCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 24,
  },
  chartPlaceholder: {
    height: 180,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    paddingBottom: 8,
  },
  barColumn: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    width: (width - 120) / 7,
  },
  bar: {
    width: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 16,
    marginLeft: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricCard: {
    width: (width - 56) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  metricIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  metricTitle: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  }
});
