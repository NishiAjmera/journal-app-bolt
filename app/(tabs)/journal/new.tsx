import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { journalAreas } from '@/constants/journalAreas';
import { supabase } from '@/lib/supabase';

export default function NewJournalEntry() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!title || !content || !selectedCategory) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Not authenticated');
      }

      const { error: supabaseError } = await supabase
        .from('journal_entries')
        .insert([
          {
            title,
            content,
            category: selectedCategory,
            user_id: user.id
          },
        ]);

      if (supabaseError) throw supabaseError;

      router.back();
    } catch (err) {
      console.error('Error saving journal entry:', err);
      setError('Failed to save entry. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={colors.neutral[900]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Entry</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <TextInput
          style={styles.titleInput}
          placeholder="Entry Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor={colors.neutral[400]}
        />

        <View style={styles.categoryContainer}>
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.categoryGrid}>
            {journalAreas.map((area) => (
              <TouchableOpacity
                key={area.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === area.id && { backgroundColor: `${area.color}20` },
                ]}
                onPress={() => setSelectedCategory(area.id)}
              >
                <View
                  style={[
                    styles.categoryDot,
                    { backgroundColor: area.color },
                  ]}
                />
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === area.id && { color: area.color },
                  ]}
                >
                  {area.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Content</Text>
        <TextInput
          style={styles.contentInput}
          placeholder="Write your thoughts..."
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          placeholderTextColor={colors.neutral[400]}
        />

        <TouchableOpacity
          style={[
            styles.submitButton,
            (isLoading || !title || !content || !selectedCategory) && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isLoading || !title || !content || !selectedCategory}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.submitButtonText}>Save Entry</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: colors.neutral[900],
  },
  content: {
    flex: 1,
    padding: 16,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.error[600],
    backgroundColor: colors.error[50],
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  titleInput: {
    fontFamily: 'Inter-Medium',
    fontSize: 24,
    color: colors.neutral[900],
    marginBottom: 24,
    padding: 0,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.neutral[900],
    marginBottom: 12,
  },
  categoryContainer: {
    marginBottom: 24,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 6,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.neutral[600],
  },
  contentInput: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.neutral[900],
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    minHeight: 200,
    marginBottom: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  submitButton: {
    backgroundColor: colors.primary[600],
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  submitButtonDisabled: {
    backgroundColor: colors.neutral[300],
  },
  submitButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.white,
  },
});