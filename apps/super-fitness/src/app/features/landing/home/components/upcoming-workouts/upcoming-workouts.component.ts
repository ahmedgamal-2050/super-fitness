import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';

interface WorkoutCard {
  titleKey: string;
  btnKey: string;
  image: string;
  category: string;
}

@Component({
  selector: 'app-upcoming-workouts',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './upcoming-workouts.component.html',
})
export class UpcomingWorkoutsComponent {
  categories = [
    { id: 'all', labelKey: 'landing_page_workouts_section_tab_all_label' },
    { id: 'chest', labelKey: 'landing_page_workouts_section_tab_chest_label' },
    { id: 'arm', labelKey: 'landing_page_workouts_section_tab_arm_label' },
    { id: 'shoulder', labelKey: 'landing_page_workouts_section_tab_shoulder_label' },
    { id: 'back', labelKey: 'landing_page_workouts_section_tab_back_label' },
    { id: 'legs', labelKey: 'landing_page_workouts_section_tab_legs_label' },
    { id: 'sensors', labelKey: 'landing_page_workouts_section_tab_sensors_label' },
  ];

  workouts: WorkoutCard[] = [
    {
      titleKey: 'landing_page_workouts_section_card_group_title_text',
      btnKey: 'landing_page_workouts_section_card_group_btn_label',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop',
      category: 'all',
    },
    {
      titleKey: 'landing_page_workouts_section_card_personal_title_text',
      btnKey: 'landing_page_workouts_section_card_personal_btn_label',
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop',
      category: 'all',
    },
    {
      titleKey: 'landing_page_workouts_section_card_muscle_title_text',
      btnKey: 'landing_page_workouts_section_card_muscle_btn_label',
      image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop',
      category: 'all',
    },
    // chest
    {
      titleKey: 'landing_page_workouts_section_card_muscle_title_text',
      btnKey: 'landing_page_workouts_section_card_muscle_btn_label',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop',
      category: 'chest',
    },
    // arm
    {
      titleKey: 'landing_page_workouts_section_card_personal_title_text',
      btnKey: 'landing_page_workouts_section_card_personal_btn_label',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop',
      category: 'arm',
    },
    // shoulder
    {
      titleKey: 'landing_page_workouts_section_card_group_title_text',
      btnKey: 'landing_page_workouts_section_card_group_btn_label',
      image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop',
      category: 'shoulder',
    },
    // back
    {
      titleKey: 'landing_page_workouts_section_card_muscle_title_text',
      btnKey: 'landing_page_workouts_section_card_muscle_btn_label',
      image: 'https://images.unsplash.com/photo-1605296867304-46d5465a25f1?q=80&w=600&auto=format&fit=crop',
      category: 'back',
    },
    // legs
    {
      titleKey: 'landing_page_workouts_section_card_personal_title_text',
      btnKey: 'landing_page_workouts_section_card_personal_btn_label',
      image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?q=80&w=600&auto=format&fit=crop',
      category: 'legs',
    },
    // sensors
    {
      titleKey: 'landing_page_workouts_section_card_group_title_text',
      btnKey: 'landing_page_workouts_section_card_group_btn_label',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop',
      category: 'sensors',
    },
  ];

  selectedCategory = signal<string>('all');
  activeSlideIndex = signal<number>(0);

  filteredWorkouts = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'all') {
      return this.workouts.filter(w => w.category === 'all');
    }
    // Return the selected category card along with a couple of defaults to keep 3 items in viewport
    const filtered = this.workouts.filter(w => w.category === cat);
    const defaults = this.workouts.filter(w => w.category === 'all');
    return [...filtered, ...defaults].slice(0, 3);
  });

  selectCategory(catId: string) {
    this.selectedCategory.set(catId);
    this.activeSlideIndex.set(0);
  }

  setSlideIndex(index: number) {
    this.activeSlideIndex.set(index);
  }
}
