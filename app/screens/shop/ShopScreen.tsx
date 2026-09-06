import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { HeroBanner } from '../../components/shop/HeroBanner';
import { SearchBar, SegmentedTabs } from '../../components/ui';
import { colors, spacing } from '../../theme';
import { MarketplaceTab } from './MarketplaceTab';
import { NearbyStoresTab } from './NearbyStoresTab';
import { TopBrandsTab } from './TopBrandsTab';

const TABS = [
  { key: 'topBrands', label: 'Top Brands' },
  { key: 'nearbyStores', label: 'Nearby Stores' },
  { key: 'marketplace', label: '1Fi Marketplace' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

const SEARCH_PLACEHOLDER: Record<TabKey, string> = {
  topBrands: 'Search online stores…',
  nearbyStores: 'Search stores…',
  marketplace: 'Search products…',
};

/** Hosts the hero banner, 3-way segmented switcher and shared search bar for the Shop tab. */
export function ShopScreen() {
  // Defaults to the Marketplace tab — the actual built deliverable — rather than
  // mirroring the real app's default, so it's immediately visible on launch.
  const [activeTab, setActiveTab] = useState<TabKey>('marketplace');

  return (
    <View style={styles.screen}>
      <HeroBanner />
      <View style={styles.chrome}>
        <SegmentedTabs tabs={[...TABS]} activeKey={activeTab} onChange={(key) => setActiveTab(key as TabKey)} />
        <View style={styles.searchWrap}>
          <SearchBar placeholder={SEARCH_PLACEHOLDER[activeTab]} editable={activeTab === 'marketplace'} />
        </View>
      </View>
      <View style={styles.content}>
        {activeTab === 'topBrands' && <TopBrandsTab />}
        {activeTab === 'nearbyStores' && <NearbyStoresTab />}
        {activeTab === 'marketplace' && <MarketplaceTab />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  chrome: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  searchWrap: {
    marginTop: spacing.md,
  },
  content: {
    flex: 1,
  },
});
