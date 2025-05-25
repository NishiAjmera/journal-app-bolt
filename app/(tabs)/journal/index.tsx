import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ChevronDown, Plus } from 'lucide-react-native';
import { router } from 'expo-router';
import Header from '@/components/Header';
import JournalEntryCard from '@/components/JournalEntryCard';
import { colors } from '@/constants/colors';
import { journalAreas } from '@/constants/journalAreas';
import { supabase } from '@/lib/supabase';
import type { JournalEntry } from '@/lib/supabase';

export default function JournalScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchEntries();
  }, [selectedCategory]);

  const fetchEntries = async () => {
    try {
      setIsLoading(true);
      setError(null);

      let query = supabase
        .from('journal_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error: supabaseError } = await query;

      if (supabaseError) throw supabaseError;

      setEntries(data || []);
    } catch (err) {
      console.error('Error fetching entries:', err);
      setError('Failed to load journal entries');
    } finally {
      setIsLoading(false);
    }
  };

  const getAreaColor = (areaId) => {
    const area = journalAreas.find(a => a.id === areaId);
    return area ? area.color : colors.primary[500];
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="dark" />
      <Header title="Journal" />
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search entries..."
          placeholderTextColor={colors.neutral[400]}
        />
      </View>
      
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by:</Text>
        <View style={styles.categorySelector}>
          <Text style={styles.categoryText}>
            {selectedCategory === 'all' 
              ? 'All Categories' 
              : journalAreas.find(a => a.id === selectedCategory)?.title || 'All Categories'}
          </Text>
          <ChevronDown size={18} color={colors.neutral[600]} />
        </View>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={fetchEntries}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary[500]} />
          </View>
        ) : entries.length > 0 ? (
          entries.map((entry) => (
            <JournalEntryCard 
              key={entry.id}
              title={entry.title}
              date={entry.created_at}
              excerpt={entry.content}
              category={entry.category}
              color={getAreaColor(entry.category)}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No journal entries yet</Text>
            <Text style={styles.emptySubtext}>Start writing your thoughts</Text>
          </View>
        )}
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.fabButton}
        onPress={() => router.push('/journal/new')}
      >
        <Plus size={24} color={colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[900],
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral[600],
    marginRight: 8,
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral[800],
    marginRight: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  errorContainer: {
    backgroundColor: colors.error[50],
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.error[600],
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: colors.error[600],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.neutral[600],
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[500],
  },
  fabButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});