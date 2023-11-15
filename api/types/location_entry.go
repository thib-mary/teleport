package types

import "time"

type LocationEntry struct {
	LoginID    string
	LoginTime  time.Time
	Country    string
	City       string
	Expiration time.Time
}
