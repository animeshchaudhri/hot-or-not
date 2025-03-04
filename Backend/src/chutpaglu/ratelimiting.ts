import { Injectable } from '@nestjs/common';

interface RateLimitEntry {
  count: number;
  timestamps: number[];
}

@Injectable()
export class RateLimiterService {
  private requestMap = new Map<string, RateLimitEntry>();
  
  constructor() {
    // Clean up old entries every minute
    setInterval(() => this.cleanup(), 60000);
  }
  
  canProceed(id: string, windowSeconds = 10, maxRequests = 10): boolean {
    console.log("hi")
    const now = Date.now();
    const windowMs = windowSeconds * 1000;
    
    if (!this.requestMap.has(id)) {
      this.requestMap.set(id, { count: 1, timestamps: [now] });
      return true;
    }
    
    const entry = this.requestMap.get(id)!;
    const validTimestamps = entry.timestamps.filter(time => now - time < windowMs);
    
    if (validTimestamps.length >= maxRequests) {
      // Update with current timestamps only
      entry.timestamps = validTimestamps;
      return false;
    }
    
    // Add current timestamp and update
    entry.timestamps = [...validTimestamps, now];
    entry.count += 1;
    return true;
  }
  
  private cleanup() {
    const now = Date.now();
    
    this.requestMap.forEach((entry, key) => {
      // Remove entries older than 60 seconds
      const validTimestamps = entry.timestamps.filter(time => now - time < 60000);
      
      if (validTimestamps.length === 0) {
        this.requestMap.delete(key);
      } else {
        entry.timestamps = validTimestamps;
      }
    });
  }
}