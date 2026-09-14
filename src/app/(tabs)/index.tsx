import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Dimensions, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight, useSharedValue, useAnimatedStyle, withTiming, withDelay, useAnimatedScrollHandler, interpolate } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CHART_DATA = [40, 65, 45, 80, 55, 95, 75];

export default function DashboardScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const parallaxStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(scrollY.value, [-100, 0, 200], [-50, 0, 100], 'clamp'),
        },
      ],
    };
  });

  const onRefresh = React.useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 1500);
  }, []);

  const AnimatedBar = ({ value, index }: { value: number, index: number }) => {
    const height = useSharedValue(0);

    useEffect(() => {
      height.value = withDelay(500 + (index * 100), withTiming(value, { duration: 800 }));
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
      height: `${height.value}%`,
      opacity: height.value / 100 + 0.3
    }));

    return (
      <View style={styles.chartBarContainer}>
        <Animated.View style={[styles.chartBar, animatedStyle]} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFillObject, parallaxStyle]}>
        <Svg height="300" width={width} style={StyleSheet.absoluteFillObject}>
          <LinearGradient colors={['#e0e7ff', '#f8fafc']} style={StyleSheet.absoluteFillObject} />
          <Path
            d={`M0 0 L${width} 0 L${width} 200 Q${width/2} 300 0 150 Z`}
            fill="#f1f5f9"
            opacity="0.6"
          />
        </Svg>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2a5298" />}
      >
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.header}>
          <Text style={styles.greeting}>Good morning, Admin 👋</Text>
          <Text style={styles.subtitle}>Here is what's happening with your projects today</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.statsContainer}>
          <LinearGradient colors={['#1e3c72', '#2a5298']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.mainStatCard}>
            <View style={styles.mainStatHeader}>
              <Text style={styles.mainStatTitle}>Monthly Revenue</Text>
              <View style={styles.trendBadge}>
                <Ionicons name="trending-up" size={14} color="#10b981" />
                <Text style={styles.trendText}>+12.5%</Text>
              </View>
            </View>
            <Text style={styles.mainStatValue}>$24,500.00</Text>

            <View style={styles.chartContainer}>
              {CHART_DATA.map((val, i) => (
                <AnimatedBar key={i} value={val} index={i} />
              ))}
            </View>
          </LinearGradient>
        </Animated.View>

        <View style={styles.gridContainer}>
          <Animated.View entering={FadeInRight.delay(300).springify()} style={styles.statCard}>
            <View style={[styles.iconBox, { backgroundColor: '#e0e7ff' }]}>
              <Ionicons name="people" size={20} color="#4f46e5" />
            </View>
            <Text style={styles.statValue}>1,284</Text>
            <Text style={styles.statTitle}>Total Users</Text>
          </Animated.View>

          <Animated.View entering={FadeInRight.delay(400).springify()} style={styles.statCard}>
            <View style={[styles.iconBox, { backgroundColor: '#dcfce7' }]}>
              <Ionicons name="checkmark-circle" size={20} color="#16a34a" />
            </View>
            <Text style={styles.statValue}>842</Text>
            <Text style={styles.statTitle}>Active Subs</Text>
          </Animated.View>
        </View>

        <Animated.View entering={FadeInDown.delay(500).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <Text style={styles.seeAll}>See All</Text>
          </View>

          <View style={styles.activityItem}>
            <View style={[styles.activityIconBox, { backgroundColor: '#e0f2fe' }]}>
              <Ionicons name="person-add" size={18} color="#0284c7" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>New user signup</Text>
              <Text style={styles.activityDesc}>sarah.j@example.com joined</Text>
            </View>
            <Text style={styles.activityTime}>2m</Text>
          </View>

          <View style={styles.activityItem}>
            <View style={[styles.activityIconBox, { backgroundColor: '#fef3c7' }]}>
              <Ionicons name="star" size={18} color="#d97706" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Subscription upgraded</Text>
              <Text style={styles.activityDesc}>TechCorp Inc. moved to Pro</Text>
            </View>
            <Text style={styles.activityTime}>1h</Text>
          </View>

          <View style={[styles.activityItem, { borderBottomWidth: 0 }]}>
            <View style={[styles.activityIconBox, { backgroundColor: '#dcfce7' }]}>
              <Ionicons name="card" size={18} color="#16a34a" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Payment received</Text>
              <Text style={styles.activityDesc}>$49.00 from Marketing LLC</Text>
            </View>
            <Text style={styles.activityTime}>3h</Text>
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    paddingBottom: Platform.OS === 'ios' ? 120 : 100,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    marginTop: 6,
    lineHeight: 22,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  mainStatCard: {
    borderRadius: 24,
    padding: 24,
    shadowColor: '#1e3c72',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  mainStatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  mainStatTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  trendText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10b981',
    marginLeft: 4,
  },
  mainStatValue: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -1,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 80,
    marginTop: 24,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  chartBarContainer: {
    width: (width - 120) / 7,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  chartBar: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 6,
  },
  gridContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statValue: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  section: {
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2a5298',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  activityIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  activityDesc: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 13,
    color: '#94a3b8',
    fontWeight: '600',
  }
});
