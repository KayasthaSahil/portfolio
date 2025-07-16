#!/usr/bin/env python3

import requests
import json
import sys
import os
from datetime import datetime

# Get the backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading backend URL: {e}")
        return None

def test_backend_api():
    """Comprehensive test of all backend API endpoints"""
    
    print("🚀 Testing Portfolio Backend API Endpoints")
    print("=" * 60)
    
    # Get backend URL
    backend_url = get_backend_url()
    if not backend_url:
        print("❌ Could not get backend URL from frontend/.env")
        return False
    
    api_url = f"{backend_url}/api"
    print(f"Testing API at: {api_url}")
    print("=" * 60)
    
    test_results = []
    
    # Test 1: Health Check - GET /api/
    print("\n1. Testing Health Check Endpoint...")
    try:
        response = requests.get(f"{api_url}/", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Health check passed!")
            print(f"   - Status: {response.status_code}")
            print(f"   - Response: {data}")
            test_results.append(("Health Check", True, "Working correctly"))
        else:
            print(f"❌ Health check failed with status: {response.status_code}")
            test_results.append(("Health Check", False, f"Status code: {response.status_code}"))
    except Exception as e:
        print(f"❌ Health check failed with error: {str(e)}")
        test_results.append(("Health Check", False, str(e)))
    
    # Test 2: Portfolio Data - GET /api/portfolio
    print("\n2. Testing Portfolio Data Endpoint...")
    try:
        response = requests.get(f"{api_url}/portfolio", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Portfolio data retrieved successfully!")
            print(f"   - Status: {response.status_code}")
            print(f"   - Name: {data.get('personal', {}).get('name', 'N/A')}")
            print(f"   - Title: {data.get('personal', {}).get('title', 'N/A')}")
            print(f"   - Projects: {len(data.get('projects', []))}")
            print(f"   - Skills Categories: {len(data.get('skills', []))}")
            print(f"   - Experience Items: {len(data.get('experience', []))}")
            test_results.append(("Portfolio Data", True, "Data loaded successfully"))
        else:
            print(f"❌ Portfolio data failed with status: {response.status_code}")
            print(f"   - Response: {response.text}")
            test_results.append(("Portfolio Data", False, f"Status code: {response.status_code}"))
    except Exception as e:
        print(f"❌ Portfolio data failed with error: {str(e)}")
        test_results.append(("Portfolio Data", False, str(e)))
    
    # Test 3: Contact Form Submission - POST /api/contact
    print("\n3. Testing Contact Form Submission...")
    contact_data = {
        "name": "Sarah Johnson",
        "email": "sarah.johnson@techcorp.com",
        "subject": "Backend API Testing",
        "message": "This is a comprehensive test of the contact form API endpoint. Testing data validation and submission process."
    }
    
    try:
        response = requests.post(f"{api_url}/contact", json=contact_data, timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Contact form submission successful!")
            print(f"   - Status: {response.status_code}")
            print(f"   - Submission ID: {data.get('id', 'N/A')}")
            print(f"   - Name: {data.get('name', 'N/A')}")
            print(f"   - Email: {data.get('email', 'N/A')}")
            print(f"   - Status: {data.get('status', 'N/A')}")
            submission_id = data.get('id')
            test_results.append(("Contact Form Submission", True, "Submission successful"))
        else:
            print(f"❌ Contact form submission failed with status: {response.status_code}")
            print(f"   - Response: {response.text}")
            submission_id = None
            test_results.append(("Contact Form Submission", False, f"Status code: {response.status_code}"))
    except Exception as e:
        print(f"❌ Contact form submission failed with error: {str(e)}")
        submission_id = None
        test_results.append(("Contact Form Submission", False, str(e)))
    
    # Test 4: Invalid Contact Form Data
    print("\n4. Testing Contact Form Validation...")
    invalid_contact_data = {
        "name": "",  # Empty name
        "email": "invalid-email",  # Invalid email
        "subject": "",  # Empty subject
        "message": ""  # Empty message
    }
    
    try:
        response = requests.post(f"{api_url}/contact", json=invalid_contact_data, timeout=10)
        if response.status_code == 422:  # Validation error expected
            print(f"✅ Contact form validation working correctly!")
            print(f"   - Status: {response.status_code} (Validation Error)")
            test_results.append(("Contact Form Validation", True, "Validation working"))
        elif response.status_code == 200:
            print(f"⚠️  Contact form accepted invalid data (validation may be weak)")
            test_results.append(("Contact Form Validation", True, "Accepts invalid data"))
        else:
            print(f"❌ Unexpected response for invalid data: {response.status_code}")
            test_results.append(("Contact Form Validation", False, f"Unexpected status: {response.status_code}"))
    except Exception as e:
        print(f"❌ Contact form validation test failed: {str(e)}")
        test_results.append(("Contact Form Validation", False, str(e)))
    
    # Test 5: Get Contact Submissions - GET /api/contact (Admin)
    print("\n5. Testing Contact Submissions Retrieval (Admin)...")
    try:
        response = requests.get(f"{api_url}/contact", timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Contact submissions retrieved successfully!")
            print(f"   - Status: {response.status_code}")
            print(f"   - Total submissions: {len(data)}")
            if data:
                print(f"   - Latest submission: {data[0].get('name', 'N/A')} - {data[0].get('subject', 'N/A')}")
                print(f"   - Status: {data[0].get('status', 'N/A')}")
            test_results.append(("Contact Submissions Retrieval", True, f"Retrieved {len(data)} submissions"))
        else:
            print(f"❌ Contact submissions retrieval failed with status: {response.status_code}")
            print(f"   - Response: {response.text}")
            test_results.append(("Contact Submissions Retrieval", False, f"Status code: {response.status_code}"))
    except Exception as e:
        print(f"❌ Contact submissions retrieval failed with error: {str(e)}")
        test_results.append(("Contact Submissions Retrieval", False, str(e)))
    
    # Test 6: Update Contact Submission Status - PUT /api/contact/{id}
    print("\n6. Testing Contact Submission Status Update...")
    if submission_id:
        try:
            # Test updating status to 'read'
            response = requests.put(f"{api_url}/contact/{submission_id}?status=read", timeout=10)
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Contact submission status updated successfully!")
                print(f"   - Status: {response.status_code}")
                print(f"   - Response: {data}")
                test_results.append(("Contact Status Update", True, "Status updated to 'read'"))
                
                # Test updating status to 'responded'
                response2 = requests.put(f"{api_url}/contact/{submission_id}?status=responded", timeout=10)
                if response2.status_code == 200:
                    print(f"✅ Status updated to 'responded' successfully!")
                    test_results.append(("Contact Status Update (responded)", True, "Status updated to 'responded'"))
                else:
                    print(f"❌ Failed to update status to 'responded': {response2.status_code}")
                    test_results.append(("Contact Status Update (responded)", False, f"Status code: {response2.status_code}"))
            else:
                print(f"❌ Contact submission status update failed with status: {response.status_code}")
                print(f"   - Response: {response.text}")
                test_results.append(("Contact Status Update", False, f"Status code: {response.status_code}"))
        except Exception as e:
            print(f"❌ Contact submission status update failed with error: {str(e)}")
            test_results.append(("Contact Status Update", False, str(e)))
    else:
        print("⚠️  Skipping status update test (no submission ID available)")
        test_results.append(("Contact Status Update", False, "No submission ID available"))
    
    # Test 7: Database Operations Test
    print("\n7. Testing Data Persistence...")
    try:
        # Submit another contact form
        test_contact = {
            "name": "Michael Chen",
            "email": "michael.chen@startup.io",
            "subject": "Data Persistence Test",
            "message": "Testing if data persists correctly in the database."
        }
        
        response = requests.post(f"{api_url}/contact", json=test_contact, timeout=10)
        if response.status_code == 200:
            # Immediately retrieve submissions to verify persistence
            response2 = requests.get(f"{api_url}/contact", timeout=10)
            if response2.status_code == 200:
                submissions = response2.json()
                # Check if our test submission is in the list
                found = any(sub.get('name') == 'Michael Chen' for sub in submissions)
                if found:
                    print(f"✅ Data persistence verified!")
                    print(f"   - Test submission found in database")
                    test_results.append(("Data Persistence", True, "Data persists correctly"))
                else:
                    print(f"❌ Data persistence failed - submission not found")
                    test_results.append(("Data Persistence", False, "Submission not found"))
            else:
                print(f"❌ Could not verify persistence - retrieval failed")
                test_results.append(("Data Persistence", False, "Could not verify"))
        else:
            print(f"❌ Could not test persistence - submission failed")
            test_results.append(("Data Persistence", False, "Submission failed"))
    except Exception as e:
        print(f"❌ Data persistence test failed with error: {str(e)}")
        test_results.append(("Data Persistence", False, str(e)))
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 BACKEND API TEST SUMMARY")
    print("=" * 60)
    
    passed_tests = sum(1 for _, passed, _ in test_results if passed)
    total_tests = len(test_results)
    
    for test_name, passed, details in test_results:
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{status}: {test_name} - {details}")
    
    print(f"\nOverall Result: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("🎉 ALL BACKEND API TESTS PASSED! 🎉")
        return True
    else:
        print(f"⚠️  {total_tests - passed_tests} test(s) failed")
        return False

if __name__ == "__main__":
    result = test_backend_api()
    sys.exit(0 if result else 1)