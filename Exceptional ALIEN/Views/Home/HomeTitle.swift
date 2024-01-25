//
//  HomeTitle.swift
//  Exceptional ALIEN
//
//  Created by Adam Johnson on 25/1/2024.
//

import SwiftUI

struct HomeTitle: View {
    var body: some View {
        HStack(spacing: 4) {
            Image("logo-icon")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(height: 24)
                .foregroundColor(.eaBlue)
            
                Text("Sydney")
                .font(.custom("NHaasGroteskDSStd-65Md", size: 24, relativeTo: .title))
                    .foregroundColor(.eaBlue)
        }
    }
}

#Preview {
    HomeTitle()
}
