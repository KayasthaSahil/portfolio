#!/usr/bin/env python3

import asyncio
import sys
import json
from pathlib import Path

# Add the backend directory to the Python path
sys.path.append('/app/backend')

from models.portfolio import PortfolioData, ContactSubmissionCreate
from database import get_database
from routes.portfolio import get_portfolio_data, submit_contact_form, get_contact_submissions

async def test_backend_functionality():
    """Test all backend functionality"""
    
    print("🚀 Testing Backend Functionality")
    print("=" * 50)
    
    try:
        # Get database connection
        db = await get_database()
        
        # Test 1: Portfolio Data Retrieval
        print("\n1. Testing Portfolio Data Retrieval...")
        portfolio_data = await get_portfolio_data(db)
        if portfolio_data:
            print(f"✅ Portfolio data retrieved successfully!")
            print(f"   - Name: {portfolio_data.personal.name}")
            print(f"   - Title: {portfolio_data.personal.title}")
            print(f"   - Projects: {len(portfolio_data.projects)}")
            print(f"   - Skills Categories: {len(portfolio_data.skills)}")
        else:
            print("❌ Failed to retrieve portfolio data")
            return False
        
        # Test 2: Contact Form Submission
        print("\n2. Testing Contact Form Submission...")
        test_contact = ContactSubmissionCreate(
            name="Test Backend User",
            email="backend.test@example.com",
            subject="Backend Test",
            message="This is a test message from the backend test script."
        )
        
        contact_result = await submit_contact_form(test_contact, db)
        if contact_result:
            print(f"✅ Contact form submission successful!")
            print(f"   - ID: {contact_result.id}")
            print(f"   - Name: {contact_result.name}")
            print(f"   - Status: {contact_result.status}")
        else:
            print("❌ Failed to submit contact form")
            return False
        
        # Test 3: Contact Submissions Retrieval
        print("\n3. Testing Contact Submissions Retrieval...")
        submissions = await get_contact_submissions(db=db)
        if submissions:
            print(f"✅ Contact submissions retrieved successfully!")
            print(f"   - Total submissions: {len(submissions)}")
            for i, submission in enumerate(submissions[:3]):  # Show first 3
                print(f"   - Submission {i+1}: {submission.name} - {submission.subject}")
        else:
            print("❌ Failed to retrieve contact submissions")
            return False
        
        # Test 4: Database Connection
        print("\n4. Testing Database Connection...")
        collections = await db.list_collection_names()
        if collections:
            print(f"✅ Database connection successful!")
            print(f"   - Available collections: {', '.join(collections)}")
        else:
            print("❌ Database connection failed")
            return False
        
        print("\n" + "=" * 50)
        print("🎉 ALL BACKEND TESTS PASSED! 🎉")
        return True
        
    except Exception as e:
        print(f"\n❌ Backend test failed with error: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    result = asyncio.run(test_backend_functionality())
    sys.exit(0 if result else 1)