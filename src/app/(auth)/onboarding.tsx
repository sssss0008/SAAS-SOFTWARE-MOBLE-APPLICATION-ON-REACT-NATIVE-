import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp, withRepeat, withTiming, useSharedValue, useAnimatedStyle, withSequence } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const floatAnim = useSharedValue(0);

  useEffect(() => {
    floatAnim.value = withRepeat(
      withSequence(
        withTiming(-15, { duration: 1500 }),
        withTiming(0, { duration: 1500 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatAnim.value }]
  }));

  const handleGetStarted = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0f172a', '#1e3a8a', '#3b82f6']} style={StyleSheet.absoluteFillObject} />

      <View style={styles.content}>
        <Animated.View entering={FadeInUp.delay(200).duration(1000).springify()} style={[styles.heroContainer, animatedStyle]}>
          <View style={styles.heroCircle1}>
            <View style={styles.heroCircle2}>
              <View style={styles.heroCircle3}>
                <Ionicons name="rocket" size={64} color="#ffffff" />
              </View>
            </View>
          </View>
        </Animated.View>

        <View style={styles.textContainer}>
          <Animated.Text entering={FadeInDown.delay(500).duration(800).springify()} style={styles.title}>
            Manage Your SaaS
            <Text style={styles.titleHighlight}> Effortlessly</Text>
          </Animated.Text>

          <Animated.Text entering={FadeInDown.delay(700).duration(800).springify()} style={styles.subtitle}>
            The ultimate mobile dashboard for modern SaaS founders. Track MRR, manage users, and monitor growth in real-time.
          </Animated.Text>
        </View>

        <Animated.View entering={FadeInDown.delay(900).duration(800).springify()} style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted} activeOpacity={0.9}>
            <LinearGradient colors={['#38bdf8', '#2563eb']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Get Started</Text>
              <View style={styles.buttonIcon}>
                <Ionicons name="arrow-forward" size={20} color="#2563eb" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 32,
    justifyContent: 'space-between',
    paddingTop: height * 0.15,
    paddingBottom: height * 0.08,
  },
  heroContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
  },
  heroCircle1: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroCircle2: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroCircle3: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  textContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: 48,
    marginBottom: 16,
  },
  titleHighlight: {
    color: '#38bdf8',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: 24,
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    width: '100%',
    height: 64,
    borderRadius: 32,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  buttonGradient: {
    flex: 1,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingLeft: 32,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  buttonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
