import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

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

        {/* Animated Line Chart */}
        <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.chartCard}>
          <Text style={styles.chartTitle}>Revenue Growth</Text>
          <Text style={styles.chartSubtitle}>vs previous {activePeriod.toLowerCase()}</Text>

          <View style={styles.chartContainer}>
            <Svg width="100%" height="180" viewBox="0 0 300 180" style={styles.svgChart}>
              <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#3b82f6" stopOpacity="0.3" />
                  <Stop offset="1" stopColor="#3b82f6" stopOpacity="0.0" />
                </LinearGradient>
              </Defs>
              <Path
                d="M 0 150 C 50 150, 60 80, 100 90 C 140 100, 150 40, 200 50 C 250 60, 280 20, 300 10 L 300 180 L 0 180 Z"
                fill="url(#grad)"
              />
              <Path
                d="M 0 150 C 50 150, 60 80, 100 90 C 140 100, 150 40, 200 50 C 250 60, 280 20, 300 10"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <View style={styles.chartPoint1} />
              <View style={styles.chartPoint2} />
              <View style={styles.chartPoint3} />
            </Svg>

            <View style={styles.chartLabels}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <Text key={i} style={styles.chartLabelText}>{day}</Text>
              ))}
            </View>
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
  chartContainer: {
    height: 180,
    marginTop: 16,
    marginHorizontal: -12,
  },
  svgChart: {
    flex: 1,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 8,
  },
  chartLabelText: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
  },
  chartPoint1: { position: 'absolute', width: 8, height: 8, borderRadius: 4, backgroundColor: '#ffffff', borderWidth: 2, borderColor: '#3b82f6', left: 96, top: 86 },
  chartPoint2: { position: 'absolute', width: 8, height: 8, borderRadius: 4, backgroundColor: '#ffffff', borderWidth: 2, borderColor: '#3b82f6', left: 196, top: 46 },
  chartPoint3: { position: 'absolute', width: 8, height: 8, borderRadius: 4, backgroundColor: '#ffffff', borderWidth: 2, borderColor: '#3b82f6', left: 296, top: 6 },
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
