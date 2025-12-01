import { db } from '@/core/db';
import { envConfigs } from '@/config';
import { config } from '@/config/db/schema';

import { publicSettingNames } from '../services/settings';

export type Config = typeof config.$inferSelect;
export type NewConfig = typeof config.$inferInsert;
export type UpdateConfig = Partial<Omit<NewConfig, 'name'>>;

export type Configs = Record<string, string>;

export async function saveConfigs(configs: Record<string, string>) {
  const result = await db().transaction(async (tx) => {
    const configEntries = Object.entries(configs);
    const results = [];

    for (const [name, configValue] of configEntries) {
      const [upsertResult] = await tx
        .insert(config)
        .values({ name, value: configValue })
        .onConflictDoUpdate({
          target: config.name,
          set: { value: configValue },
        })
        .returning();

      results.push(upsertResult);
    }

    return results;
  });

  return result;
}

export async function addConfig(newConfig: NewConfig) {
  const [result] = await db().insert(config).values(newConfig).returning();

  return result;
}

export async function getConfigs(): Promise<Configs> {
  const configs: Record<string, string> = {};

  if (!envConfigs.database_url) {
    return configs;
  }

  const result = await db().select().from(config);
  if (!result) {
    return configs;
  }

  for (const config of result) {
    configs[config.name] = config.value ?? '';
  }

  return configs;
}

export async function getAllConfigs(): Promise<Configs> {
  let dbConfigs: Configs = {};

  // only get configs from db in server side
  if (envConfigs.database_url) {
    try {
      dbConfigs = await getConfigs();
    } catch (e) {
      console.log(`get configs from db failed:`, e);
      dbConfigs = {};
    }
  }

  const configs = {
    ...envConfigs,
    ...dbConfigs,
  };

  return configs;
}

export async function getPublicConfigs(): Promise<Configs> {
  let dbConfigs: Configs = {};

  // only get configs from db in server side
  if (typeof window === 'undefined' && envConfigs.database_url) {
    try {
      dbConfigs = await getConfigs();
    } catch (e) {
      console.log('get configs from db failed:', e);
      dbConfigs = {};
    }
  }

  const publicConfigs: Record<string, string> = {};

  // get public configs from db
  for (const key in dbConfigs) {
    if (publicSettingNames.includes(key)) {
      publicConfigs[key] = dbConfigs[key];
    }
  }

  const configs = {
    ...publicConfigs,
  };

  return configs;
}
